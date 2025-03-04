import {Relation, HasMany, HasManyBy, HasOne} from 'pinia-orm'
import type {Repository, PrimaryKey, Model as $Model} from 'pinia-orm'

export * from './model'
export * from './auth'
import type { Model } from './model'

/** Shortcut to an object of repositories by model entity. */
export type Repos={[s: string]: Repository<Model>}


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
    if(field instanceof HasMany || field instanceof HasManyBy || field instanceof HasOne)
        return field.foreignKey
    return null
}
