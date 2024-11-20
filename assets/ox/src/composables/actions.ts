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
     * @property {Model} value - value or model instance.
     */
    item: M
    /**
     * @property {String} text - text displayed to user.
     */
    title: string
    /**
     * @property {String} icon
     */
    icon: string
    /**
     * @property {String} color
     */
    color?: string
    /**
     * @property {Boolean} button - display action as a small button
     */
    button?: boolean
    /**
     * @property {String} confirm - if provided ask user for confirmation before
     * executing the action.
     */
    confirm?: string
    /**
     * @property {Array<string | Function>} permissions - required permission to run the action
     */
    permissions: IPermissionItem[]
    /**
     * @property {ActionRun} run: function to call when action is executed
     */
    run: ActionRun<M,R>
}


export interface IAction<M extends Model, R> {
    processing: Ref<boolean>
    permissions: Permissions
    allowed: ComputedRef<boolean>
    run: (...args: any[]) => Promise<R>
}

type ActionOpts = {
    user: User
    emits?: (event: string, ...opts: any[]) => void
}

export function useAction<M extends Model,R>(props: ActionProps<M,R>, {user, emits=undefined}: ActionOpts) : IAction<M,R> {
    const processing = ref(false)
    const {permissions, allowed} = usePermissions(user, props.permissions, props.item)

    async function run(...args: any[]): Promise<any> {
        if(props.confirm && !confirm(props.confirm))
            return
        if(!allowed.value)
            throw Error(`You are not allowed to execute this action`)

        processing.value = true
        let result : any = props.run(user, props.item, ...args)
        if(result instanceof Promise)
            result = await result

        processing.value = false
        if(emits)
            emits('completed', props.item, ...args)
        return result
    }
    return { processing, permissions, allowed, run }
}


type modelApiActionOptionFunc<M extends Model> = (user: User, item: M) => object
type modelApiActionSerialize<M extends Model> = (user: User, item: M) => object

/**
 * Options passed down to `makeModelApiAction` function.
 */
interface modelApiActionOpts<M extends Model> {
    repo: Repository<M>
    /**
     * @property method - HTTP method
     */
    method: string,
    /**
     * @property options - request options (as an object or a callable)
     */
    options?: {[k: string]: any} | modelApiActionOptionFunc<M>,
    /**
     * @property serialize - serialization function before sending object.
     */
    serialize?: modelApiActionSerialize<M>,
    /**
     * @property url - use this url instead of item's one.
     */
    url?: string,
    /**
     * @property path - append path to request url
     */
    path?: string,
}


/**
 * Create `run` function for action calling model's api.
 */
export function makeModelApiAction<M extends Model, R>(
    {repo, method, options=undefined, serialize=undefined, url=undefined, path=undefined} : modelApiActionOpts<M>
) : ActionRun<M,R> {
    return async function(user: User, item: M) {
        const args : any[] = [
            url ?? item.$url(path)
        ]
        if(serialize)
            args.push(serialize(user, item))

        const opts = options instanceof Function ? options(user, item) : options
        return await repo.api()[method](...args, opts)
    }
}
