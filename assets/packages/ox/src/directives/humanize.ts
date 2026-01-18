import type { App, Directive, DirectiveBinding } from 'vue'
import { useHumanize, UseHumanize } from '../composables/humanize'

type HTMLElementWithTimer = HTMLElement & {
    __humanizeTimer?: number
}

interface HumanizeDirective extends Directive<HTMLElementWithTimer, any> {}

function clearTimer(el: HTMLElementWithTimer) {
    if (el.__humanizeTimer) {
        window.clearInterval(el.__humanizeTimer)
        delete el.__humanizeTimer
    }
}

/**
 * Base function to apply humanize formatting to an element
 */
function applyHumanize(
    el: HTMLElementWithTimer,
    binding: DirectiveBinding,
    formatter: (value: any) => string,
    autoUpdate: boolean
) {
    if (!binding.value) {
        el.textContent = ''
        return
    }

    el.textContent = formatter(binding.value)

    if (autoUpdate) {
        clearTimer(el)
        el.__humanizeTimer = window.setInterval(() => {
            el.textContent = formatter(binding.value)
        }, 60_000)
    }
}

/**
 * v-natural-time directive
 */
export const vNaturalTime: HumanizeDirective = {
    mounted(el, binding) {
        const { naturalTime } = useHumanize() as UseHumanize
        applyHumanize(el, binding, naturalTime, true)
    },

    updated(el, binding) {
        const { naturalTime } = useHumanize() as UseHumanize
        applyHumanize(el, binding, naturalTime, true)
    },

    unmounted(el) {
        clearTimer(el)
    },
}

/**
 * v-natural-day directive
 */
export const vNaturalDay: HumanizeDirective = {
    mounted(el, binding) {
        const { naturalDay } = useHumanize() as UseHumanize
        applyHumanize(el, binding, naturalDay, false)
    },

    updated(el, binding) {
        const { naturalDay } = useHumanize() as UseHumanize
        applyHumanize(el, binding, naturalDay, false)
    },

    unmounted(el) {
        clearTimer(el)
    },
}

/**
 * Registers all humanize directives globally
 *
 * A timer is used to update the result each minute.
 */
export function registerHumanizeDirectives(app: App) {
    app.directive('natural-time', vNaturalTime)
    app.directive('natural-day', vNaturalDay)
}
