import type { Database, Repository as $Repository } from 'pinia-orm'
import type { Pinia } from 'pinia'
import type { ModelId, Model, ModelType } from './model'

import { difference, pull, union } from 'lodash'
import { AxiosRepository } from '@pinia-orm/axios'


/**
 * Reference type used to identify an item and owner in the repository.
 */
export type RefKey = string|number


/**
 * Provide reference count for items, by context key using acquire-release mechanism.
 *
 * This allows to keep memory low by keeping a registry of items being used.
 *
 * A single repository can be used for multiple purpose. The objects handling
 * data acquisition (as {@link ModelList}) will acquire objects keeping reference count.
 *
 * **Remember to always clean before dropping since there is no clean automation
 * from javascript (eg. on
 * components unmount). This is already done by some components as {@link OxModelPanel}.**
 *
 * An object released with not more reference is destroyed from database.
 *
 * **Note**: once an object is tagged as acquired, it will be destroyed on release
 * no matter if there are other use outside of it.
 */
export class RefCounter<M extends Model, R extends RefRepository<M>> {
    static _lastKey = 0

    repo: R

    /** Acquired items */
    items: Record<RefKey, RefKey[]>

    constructor(repo: R) {
        this.repo = repo
        this.items = {}
    }

    /** Acquire a unique context key */
    acquireKey(): number {
        return RefCounter._lastKey++
    }

    /** Acquire provided ids for this key */
    acquire(key: RefKey, ids: RefKey[]) {
        if(ids?.length)
            for(var id of ids) {
                if(id in this.items) {
                    const tags = this.items[id]
                    !tags.includes(key) && tags.push(key)
                }
                else
                    this.items[id] = [key]
            }
    }

    /** Release provided ids for this key */
    release(key: RefKey, ids: RefKey[]) {
        if(!ids?.length)
            return

        const drop = []
        for(var id of ids) {
            const tags = this.items[id]
            pull(tags, key)
            if(!tags?.length) {
                drop.push(id)
                delete this.items[id]
            }
        }

        if(drop.length)
            this.repo.destroy(drop)
    }

    /**
     * Release and acquire for this key.
     *
     * This optimizes out ids
     */
    releaseAcquire(key: RefKey, releaseIds: RefKey[], acquireIds: RefKey[]) {
        this.release(key, difference(releaseIds, acquireIds))
        this.acquire(key, difference(acquireIds, releaseIds))
    }

    /** Release all reference for the provided context key. */
    flush(key: RefKey) {
        const drop = []
        for(var id in this.items) {
            const tags = this.items[id]
            const idx = tags.indexOf(key)
            if(idx != -1) {
                tags.splice(idx,1)
                if(!tags.length) {
                    drop.push(id)
                    delete this.items[id]
                }
            }
        }

        if(drop.length)
            this.repo.destroy(drop)
    }

    /** Clear reference counter without destroying items. **/
    clear() {
        this.items = {}
    }

}


/**
 * This interface shall be used whenever you required Model's features
 * under the repository. It ensure the model fields are available
 */
export interface Repository<M extends Model> extends $Repository<M> {
    declare use?: ModelType
}


/**
 * Base repository used by Oxylus application.
 *
 * It:
 * - provides a `counter` property: used for object reference tracking
 * - AxiosRepository: used to fetch items from api.
 */
export class RefRepository<M extends Model> extends AxiosRepository<M> {
    declare use?: ModelType
    refs: RefCounter<M, RefRepository<M>>

    constructor(database: Database, pinia?: Pinia) {
        super(database, pinia)
        this.refs = new RefCounter(this)
    }

    flush(): M[] {
        this.refs.clear()
        return super.flush()
    }
}
