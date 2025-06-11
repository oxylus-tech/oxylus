import { computed, ref } from 'vue'

import type { ComputedRef, Ref } from 'vue'
import type { Repository } from 'pinia-orm'
import type { Response } from '@pinia-orm/axios'

import { User, Model } from '../models'
import type { IPermissionGetCodename } from '../models'


export type ActionRun<M extends Model, R> = (user: User, item: M, ...args: any[]) => Promise<R>
export type ActionCompleted<M extends Model, R> = (user: User, item: Model, result: R) => void


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


export interface IAction<M extends Model, R> {
    /**
     * Wether the action is running.
     */
    processing: Ref<boolean>
    /**
     * Action properties
     */
    props: ActionProps<M, R>
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
    const run = async (...args: any[]): Promise<R> => {
        if(props.confirm && !confirm(props.confirm))
            return

        if(props.href)
            return window.open(props.href, '_blank')

        processing.value = true

        let result : R = props.run(user, props.item, ...args)
        if(result instanceof Promise)
            result = await result

        processing.value = false
        if(emits)
            emits('completed', props.item, ...args)
        return result
    }
    return {processing, run, allowed}
}
