import {Relation, BelongsTo, HasMany, HasManyBy, HasOne} from 'pinia-orm'
import type {Repository, PrimaryKey, Model as $Model} from 'pinia-orm'

import type { ClassType } from '../utils'

export * from './enum'
export * from './model'
export * from './auth'
export * from './repository'

import type { Model } from './model'
import type { RefRepository } from './repository'

/** Record of repositories by model entity. */
export type Repos = Record<string, Repository<Model>>

/** Record of {@link RefRepository} by model entity. */
export type RefRepos = Record<string, RefRepository<Model>>

/** Generic type for typing model classes. **/
export type ModelType<T extends Model> = ClassType<T>

/** Return relation based on field name or Relation field. */
export function asRelation<M extends $Model>(repo: Repository<M>, relation: string|Relation): Relation|null {
    if(typeof relation == "string") {
        const fields = repo.use?.fields()
        const field = fields && fields[relation] || null
        relation = field instanceof Relation ? field : null
    }
    return relation
}

/**
 * For the provided relation, return the field name providing ids of related
 * models.
 */
export function getSourceKey(field: Relation): PrimaryKey|null  {
    if(field instanceof HasMany || field instanceof HasManyBy || field instanceof HasOne || field instanceof BelongsTo)
        return field.foreignKey
    return null
}
