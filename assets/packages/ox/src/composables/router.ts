import { reactive, computed, ref, onUnmounted, onMounted, inject, provide, shallowReactive } from 'vue'
import type { Reactive, ComputedRef } from 'vue'
import { acquireUniqueIndex, State } from '../utils'


/* ------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------ */

/**
 * Represents a target for navigation.
 */
export interface RouterTarget {
    panel?: string
    view?: string
    section?: string
    value?: string | number | null
    href?: string
}

/**
 * Options for programmatic navigation.
 */
export interface RouterNavOptions {
    replace?: boolean
    silent?: boolean
}

/**
 * Panel definition.
 */
export interface PanelDefinition {
    name: string
    title?: string
    state: State
    icon?: string
    href?: string
    index?: string

    // active editions
    editions: Record<string, boolean>
}

/** Ordered view categories. */
export const viewCategories = ['list', 'detail', 'create', 'dashboard', 'workflow', 'report', 'tool', '']

/** A view's category type (one of {@link viewCategories}). **/
export type ViewCategory = (typeof viewCategories)[number]


/**
 * View definition under a panel.
 */
export interface ViewDefinition {
    name?: string
    title?: string
    icon?: string
    category: ViewCategory
    sections?: Map<string, SectionDefinition>
    disabled?: boolean
}

/**
 * Section definition under a view.
 */
export interface SectionDefinition {
    name?: string
    title?: string
}

/**
 * Context passed to guards.
 */
export interface RouterGuardContext {
    from: RouterTarget
    to: RouterTarget
    reason: 'programmatic' | 'popstate'
}

/**
 * Guard return type.
 */
export type RouterGuardResult =
    | true
    | false
    | RouterTarget
    | Promise<true | false | RouterTarget>

/**
 * Router guard function type.
 */
export type RouterGuard = (ctx: RouterGuardContext) => RouterGuardResult

/**
 * Scope to register guards for.
 */
export type RouterScope =
    | 'global'
    | `${string}`
    | `${string}:${string}`
    | `${string}:${string}:${string}`


/**
 * Result returned by useGuard
 */
export interface UseGuard {
    /** Unregister the guard **/
    unregister(): void
}

/**
 * Result returned by useRouter.
 *
 * You can change the location by different ways:
 * - `go()` method;
 * - updating attributes: `panel`, `view`, `section`, `value`
 */
export interface UseRouter {
    /**
     * The current location (writable). You can use it to change the
     * current page location or bind as v-model.
     */
    location: ComputedRef<RouterTarget>
    /** The active panel **/
    panel: ComputedRef<PanelDefinition>
    /** The active view **/
    view: ComputedRef<ViewDefinition>
    /** The active section **/
    section: ComputedRef<SectionDefinition>
    /** The current panel value **/
    value: ComputedRef<string|number|null>
    /** All the registered panels **/
    panels: Reactive<Map<string, PanelDefinition>>

    go(target: RouterTarget, options?: RouterNavOptions): Promise<void>
    addGuard(scope: RouterScope, guard: RouterGuard): () => void
    registerPanel(def: PanelDefinition): void
    getPanel(name: string): PanelDefinition | undefined
    getView(panel: string, view: string): ViewDefinition | undefined
    getSection(panel: string, view: string, section: string): SectionDefinition | undefined
}

/** Result returned by usePanel **/
export interface UsePanel {
    /** The router **/
    router: UseRouter
    /** Panel definition. Use this in favor of the one you provided. **/
    panel: PanelDefinition
    /** Guard scope **/
    scope: string
    /** True if the panel, view or section is active */
    active: ComputedRef<boolean>
    /** Return active view if any **/
    activeView: ComputedRef<ViewDefinition|null>
}


/** Result returned by usePanel **/
export interface UseView extends UsePanel {
    view: ViewDefinition,
    activeSection: ComputedRef<SectionDefinition|null>
}


/** Result returned by usePanel **/
export interface UseSection extends UseView {
    section: SectionDefinition
}


/* ------------------------------------------------------------------
 * Injection key
 * ------------------------------------------------------------------ */
export const RouterSymbol = Symbol('OxRouter')
export const PanelSymbol = Symbol('OxPanel')
export const ViewSymbol = Symbol('OxView')
export const SectionSymbol = Symbol('OxSection')


/* ------------------------------------------------------------------
 * Main composable
 * ------------------------------------------------------------------ */

/**
 * Central router for panels, views, and sections.
 * Supports guards and nested panel/view/section definitions.
 */
export function createRouter(): UseRouter {
    const panels = reactive(new Map<string, PanelDefinition>())
    const guards = reactive(new Map<RouterScope, Set<RouterGuard>>())

    const initialLocation = parseLocation(window.location)
    const committed: Reactive<RouterTarget> = reactive(initialLocation)
    const request: Reactive<RouterTarget> = reactive({})

    const navigating: Ref<boolean> = ref(false)

    // onMounted(() => go(initialLocation))

    /* -------------------- URL helpers -------------------- */

    function parseLocation(doc: Location): RouterTarget {
        const params = new URLSearchParams(doc.search)

        let value = params.get('id') ?? undefined
        if(value && value.match(/^[0-9]+$/))
            value = parseInt(value)

        return {
            panel: params.get('p') ?? undefined,
            view: params.get('v') ?? undefined,
            section: params.get('s') ?? undefined,
            value,
        }
    }

    function serialize(target: RouterTarget): string {
        const params = new URLSearchParams()
        if (target.panel) params.set('p', target.panel)
        if (target.view) params.set('v', target.view)
        if (target.section) params.set('s', target.section)
        if (target.value != null) params.set('id', String(target.value))
        return params.toString()
    }

    /* -------------------- Guards -------------------- */

    async function runGuards(
        from: RouterTarget,
        to: RouterTarget,
        reason: 'programmatic' | 'popstate'
    ): Promise<RouterTarget | false> {
        const ctx: RouterGuardContext = { from, to, reason }
        const scopes: RouterScope[] = [
            'global',
            from.panel && `${from.panel}`,
            from.view && `${from.panel}:${from.view}`,
            from.section && `${from.panel}:${from.view}:${from.section}`
        ].filter(Boolean) as RouterScope[]

        for (const scope of scopes) {
            const set = guards.get(scope)
            if (!set) continue
            for (const guard of set) {
                const result = await guard(ctx)
                if (result === true) continue
                if (result === false) return false
                return result
            }
        }
        return to
    }

    /* -------------------- Navigation -------------------- */
    function createLocationProxy() {
        return new Proxy({} as RouterLocation, {
            get(_, key: keyof RouterLocation) {
                return committed[key]
            },

            async set(_, key: keyof RouterLocation, value) {
                if (navigating.value) return true

                navigating.value = true
                try {
                    await go({ [key]: value })
                }
                finally {
                    navigating.value = false
                }
                return true
            },

            ownKeys() {
                return Reflect.ownKeys(committed)
            },

            getOwnPropertyDescriptor() {
                return { enumerable: true, configurable: true }
            }
        })
    }
    const location = shallowReactive(createLocationProxy())

    async function go(target: RouterTarget, options: RouterNavOptions = {}) {
        const from = committed
        const to: RouterTarget = { ...from, ...target }

        // may be due to reactive effect, thus we enforce panel to be present
        if(!to.panel)
            return

        to.view ??= getPanel(to.panel)?.index

        // reset id when leaving a detail views or panel
        const nextView = getView(to.panel, to.view)
        if(
            (from.panel && from.panel != to.panel) ||
            (view.value?.category == 'detail' && nextView.category != 'detail')
        )
            to.value = null

        const resolved = await runGuards(from, to, 'programmatic')
        if (resolved === false)
            return
        if (resolved !== to)
            await go(resolved, options)
        else
            await navigate(to, options)
    }

    async function navigate(target: RouterTarget, options: RouterNavOptions = {}) {
        const currentPath = window.location.pathname
        const newSearch = serialize(target)

        // Only redirect if href differs from current
        if(target.href && target.href !== currentPath) {
            window.location.href = target.href + '?' + newSearch
            return
        }

        const method = options.replace ? 'replaceState' : 'pushState'
        window.history[method]({}, '', newSearch ? `?${newSearch}` : window.location.pathname)
        Object.assign(committed, target)
    }

    /* -------------------- Popstate listener -------------------- */

    function onPopState() {
        const from = location
        const to = parseLocation(window.location)
        runGuards(from, to, 'popstate').then(resolved => {
            if (resolved === false) {
                const url = serialize(from)
                window.history.replaceState({}, '', url ? `?${url}` : window.location.pathname)
            }
            else
                Object.assign(committed, resolved)
        })
    }

    window.addEventListener('popstate', onPopState)

    /* -------------------- Registration -------------------- */

    function registerPanel(def: PanelDefinition) {
        if (!def.views)
            def.views = reactive(new Map())
        panels.set(def.name, def)

        if (!committed.panel || committed.panel == def.name)
            go({panel: def.name, view: committed.view || def.index})

        return () => panels.delete(def.name)
    }

    /* -------------------- Guard API -------------------- */

    function addGuard(scope: RouterScope, guard: RouterGuard) {
        if (!guards.has(scope))
            guards.set(scope, new Set())

        guards.get(scope)!.add(guard)
        return () => guards.get(scope)!.delete(guard)
    }

    /* -------------------- Helpers -------------------- */

    function getPanel(name?: string) {
        return panels.get(name || committed.panel)
    }

    function getView(panel?: string, view?: string) {
        return getPanel(panel)?.views?.get(view || committed.view)
    }

    function getSection(panel?: string, view?: string, section?: string) {
        return getView(panel, view)?.sections?.get(section || committed.section)
    }

    /* -------------------- Return API -------------------- */

    const panel = computed(() => getPanel(committed.panel))
    const view = computed(() => panel.value?.views.get(committed.view))
    const section = computed(() => view.value?.sections.get(committed.section))

    const router = {
        location,
        panels,
        panel, view, section,

        go,
        addGuard,
        registerPanel,
        getPanel,
        getView,
        getSection
    }
    provide(RouterSymbol, router)
    return router
}

/* ------------------------------------------------------------------
 * Composables
 * ------------------------------------------------------------------ */

/**
 * Registers a guard for a scope and auto-unregisters on unmount.
 *
 * When scope is not provided, use injected panel, view and section.
 *
 * Return unregister method
 */
export function useGuard(guard: RouterGuard, scope?: RouterScope) {
    const router = inject<UseRouter>(RouterSymbol)
    if (!router)
        throw new Error('Router not provided')

    if(!scope) {
        const {panel} = inject<UsePanel>(PanelSymbol, {})
        if(!panel)
            throw new Error("useGuard must be provided a scope or be called from within a panel.")

        const {view} = inject<UseView>(ViewSymbol, {})
        const {section} = inject<UseSection>(SectionSymbol, {})

        scope = panel.name
        view && (scope += ':' + view.name)
        section && (scope += ':' + section.name)
    }

    const unregister = router.addGuard(scope, guard)
    onUnmounted(() => unregister())
    return {unregister}
}

/** Return injected router **/
export function useRouter(): UseRouter {
    return inject<UseRouter>(RouterSymbol)
}

/**
 * Registers a panel and provides `active` computed.
 */
export function usePanel(def?: PanelDefinition): UsePanel {
    const existing = inject<UsePanel>(PanelSymbol, null)
    if(existing || !def)
        return existing

    const router = inject<UseRouter>(RouterSymbol)
    if (!router)
        throw new Error('Router not provided')

    def = {
        editions: {},
        ...def
    }
    const unregister = router.registerPanel(def)
    onUnmounted(unregister)

    const active = computed(() => router.location.panel === def.name)
    const panel = {
        router, active,
        panel: def,
        scope: def.name,
        activeView: computed(() => active.value && def.views.size ? def.views.get(router.location.view) : null)
    }
    provide(PanelSymbol, panel)
    return panel
}

/**
 * Registers a view under a panel and provides `active` computed.
 */
export function useView(def?: ViewDefinition): UseView {
    const existing = inject<UseView>(ViewSymbol, null)
    if(existing || !def)
        return existing

    const {panel, ...infos} = inject<UsePanel>(PanelSymbol)
    def = { ...def }
    def.name ??= `view-${acquireUniqueIndex()}`
    def.sections = reactive(new Map())

    panel.views.set(def.name, def)
    onUnmounted(() => views.delete(def.name))

    const active = computed(() => infos.activeView?.name == def.name)
    const view = {
        ...infos, panel, active,
        view: def,
        scope: `${panel.name}:${def.name}`,
        activeSection: computed(() => active.value && def.sections.get(router.location.section))
    }
    provide(ViewSymbol, view)
    return view
}

/**
 * Registers a section under a panel/view and provides `active` computed.
 */
export function useSection(def?: SectionDefinition): UseSection {
    const existing = inject<UseSection>(SectionSymbol, null)
    if(existing || !def)
        return existing

    const {view, active, ...infos} = inject<UseView>(ViewSymbol)
    //onUnmounted(() => view.sections.delete(def.name))

    def.name ??= `section-${acquireUniqueIndex()}`
    view.sections.set(def.name, def)

    const section = {
        ...infos, view,
        scope: `${infos.panel.name}:${view.name}:${def.name}`,
        section: def,
        active: computed(() => active.value && router.location.section == def.name)
    }
    provide(SectionSymbol, section)
    return section
}
