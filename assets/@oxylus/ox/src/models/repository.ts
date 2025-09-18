import type { Model, Database, Repository } from 'pinia-orm'
import type { Pinia } from 'pinia'
import type { ModelId } from './model'

import { difference, pull, union } from 'lodash'
import { AxiosRepository } from '@pinia-orm/axios'


export type RefKey = string|number


/**
 * Provide reference count for items, by context key using acquire-release mechanism.
 *
 * This allows to keep memory low by keeping a registry of items being used.
 *
 * An object released with not more reference is destroyed from database.
 *
 * **Note**: once an object is tagged as acquired, it will be destroyed on release
 * no matter if there are other use outside of it.
 */
export class RefCounter<M extends Model> {
    static _lastKey = 0

    repo: Repository<M>
    items: Record<RefId, RefKey[]>

    constructor(repo: Repository<M>) {
        this.repo = repo
        this.items = {}
    }

    /** Acquire a unique context key */
    acquireKey(): number {
        return this.constructor._lastKey++
    }

    /** Acquire provided ids for this key */
    acquire(key: RefKey, ids: RefId[]) {
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
    release(key: RefKey, ids: RefId[]) {
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
    releaseAcquire(key: RefKey, releaseIds: RefId[], acquireIds: RefId[]) {
        this.release(key, difference(releaseIds, acquireIds))
        this.acquire(key, difference(acquireIds, releaseIds))
    }

    /** Release all reference for the provided context key. */
    flush(key: RefKey) {
        const drop = []
        for(var id in this.refs) {
            const tags = this.refs[id]
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
        this.refs = {}
    }

}


/**
 * Base repository used by Oxylus application.
 *
 * It:
 * - provides a `counter` property: used for object reference tracking
 * - AxiosRepository: used to fetch items from api.
 */
export class Repository<M extends Model> extends AxiosRepository<M> {
    refs: RefCounter<M>

    constructor(database: Database, pinia?: Pinia) {
        super(database, pinia)
        this.refs = new RefCounter(this)
    }

    flush() {
        this.refs.clear()
        super.flush()
    }
}
