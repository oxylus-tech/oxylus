import { models } from '@oxylus/ox'


/**
 * Base model class for a :py:class:`ox.apps.content.Message`.
 */
export class Message extends models.Model {
    static fields() {
        return {
            ...super.fields(),
            author: this.attr(),
            author_name: this.string(),
            content: this.string(''),
            thread: this.string(''),
            source: this.attr(null),
            created: this.string(),
            updated: this.string(),
        }
    }
}
