import { ref } from 'vue'

import type { ComputedRef, Ref } from 'vue'
import type { Repository } from 'pinia-orm'
import type { Response } from '@pinia-orm/axios'

import { usePermissions, usePermissionsProps } from './models'
import { User, Model } from '../models'
import type { IPermissionItem, Permissions } from '../models'


export type ActionRun<M extends Model, R> = (user: User, item: M, ...args: any[]) => Promise<R>
export type ActionCompleted<M extends Model, R> = (user: User, item: Model, result: R) => void


export interface ActionProps<M extends Model, R>
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
    permissions: IPermissionItem[]
    /**
     * The function to call when action is executed
     */
    run: ActionRun<M,R>
}


export interface IAction<M extends Model, R> {
    /**
     * Wether the action is running.
     */
    processing: Ref<boolean>
    /**
     * List of required {@link Permission} to run the action.
     */
    permissions: Permissions
    /**
     * Wether the user is allowed to run the action.
     */
    allowed: ComputedRef<boolean>
    /**
     * Action properties
     */
    props: ActionProps<M, R>
}

/**
 * Action's parameters, `user` MUST be provided.
 */
type ActionOpts = {
    /**
     * The user running the action.
     */
    user: User
    /**
     * If provided, emits `completed` once the action has been
     * executed.
     */
    emits?: (event: string, ...opts: any[]) => void
}


/**
 * An `Action` is a function executable by the user.
 *
 * This class provides:
 * - user permissions check: {@link ActionProps.permissions}, {@link Action.permissions}, {@link Action.allowed}
 * - running status: {@link Action.processing}
 * - event emits when action is done: `completed` ({@link ActionCompleted})
 */
class Action<M extends Model, R> {
    constructor(opts: ActionOpts, props: ActionProps<M,R>) {
        Object.assign(this, opts)
        this.props = props

        this.processing = ref(false)
        const perms = usePermissions(this.user, props.permissions, props.item)
        this.permissions = perms.permissions
        this.allowed = perms.allowed
    }

    /**
     * Execute the action.
     */
    async run(...args: any[]): Promise<R> {
        if(this.props.confirm && !confirm(this.props.confirm))
            return
        if(!this.allowed.value)
            throw Error(`You are not allowed to execute this action`)

        this.processing.value = true
        let result : R = this.props.run(this.user, this.props.item, ...args)
        if(result instanceof Promise)
            result = await result

        this.processing.value = false
        if(this.emits)
            this.emits('completed', this.props.item, ...args)
        return result
    }
}

interface Action<M extends Model, R> extends IAction<M,R> {}


/**
 * Create a new {@link Action}.
 *
 * Important note: the object is NOT reactive, although some of its
 * attributes are.
 */
export function useAction<M extends Model,R>(opts: ActionOpts, props: ActionProps<M,R>) : Action<M,R> {
    return new Action(opts, props)
}
