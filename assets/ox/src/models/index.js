import { Relation, BelongsTo, HasMany, HasManyBy, HasOne } from 'pinia-orm';
export * from './model';
export * from './auth';
export * from './repository';
/** Return relation based on field name or Relation field. */
export function asRelation(repo, relation) {
    if (typeof relation == "string") {
        const fields = repo.use?.fields();
        const field = fields && fields[relation] || null;
        relation = field instanceof Relation ? field : null;
    }
    return relation;
}
/**
 * For the provided relation, return the field name providing ids of related
 * models.
 */
export function getSourceKey(field) {
    if (field instanceof HasMany || field instanceof HasManyBy || field instanceof HasOne || field instanceof BelongsTo)
        return field.foreignKey;
    return null;
}
