import { computed, ref } from 'vue'

import type { Ref } from 'vue'

import { User, Model, type IPermissionGetCodename } from '../models'


/**
 * A function to call when an action has been called.
 *
 * @param {User} user - user running the action.
 * @param {Model|null} item - item on which the action is run.
 * @param {any[]} ...args - extra arguments passed to the action.
 */
export type ActionRun<M extends Model, R> = (user: User, item: M, ...args: any[]) => Promise<R>


/**
 * Callback when an action has been completed.
 *
 * @param {User} user - user running the action.
 * @param {Model|null} item - item on which the action was run.
 * @param {any} result - result of the action (return value of the called function).
 */
export type ActionCompleted<M extends Model, R> = (user: User, item: M, result: R) => void


/**
 * Properties of an action.
 */
export interface IActionProps<M extends Model, R>
{
    /**
     * Value or model instance.
     */
    item: M
    /**
     * Label text displayed to user.
     */
    title: string
    /**
     * Displayed icon
     */
    icon: string
    /**
     * Displayed color
     */
    color?: string
    /**
     * Display action as a small button
     */
    button?: boolean
    /**
     * If provided, ask user for a confirmation before executing the action.
     */
    confirm?: string
    /**
     * Required permission to run the action
     */
    permission: IPermissionGetCodename
    /**
     * The function to call when action is executed
     */
    run: ActionRun<M,R>

    /** If provided, open this link */
    href?: string
}


/** Interface of an action */
export interface IAction<M extends Model, R> {
    /**
     * Wether the action is running.
     */
    processing: Ref<boolean>
    /**
     * Action properties
     */
    props: IActionProps<M, R>
}

/**
 * Action's parameters, `user` MUST be provided.
 */
export interface IAction<M extends Model, R> {
    /** Action components properties */
    props: IActionProps<M, R>
    /** The user running the action. */
    user: User
    /** If provided, emits `completed` once the action has been executed. */
    emits?: (event: string, ...opts: any[]) => void
}


/**
 * Create a new action, returning:
 * - processing: ref to boolean indicating wether the action is processing
 * - allowed: computed ref indicating wether the action is allowed
 * - run: async function to call in order to run the method
 */
export function useAction<M extends Model,R>({props, user, emits=null}: IAction<M,R>) {
    const processing = ref(false)
    const allowed = computed(() => !props.permission || user.can(props.permission, props.item))

    /** Execute the action. */
    const run = async (...args: any[]): Promise<R|void> => {
        if(props.confirm && !confirm(props.confirm))
            return

        if(props.href) {
            window.open(props.href, '_blank')
            return
        }

        processing.value = true

        let result : R|Promise<R> = props.run(user, props.item, ...args)
        if(result instanceof Promise)
            result = await result

        processing.value = false
        if(emits)
            emits('completed', props.item, ...args)
        return result
    }
    return {processing, run, allowed}
}
