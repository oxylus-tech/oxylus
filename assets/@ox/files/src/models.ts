import {models} from 'ox'
import {Owned} from '@ox/auth/models'


export class Folder extends Owned {
    static entity = "folders"
    static meta = new models.Meta({
        app: "ox_files",
        model: "folder",
        url: "ox/files/folder/",
        title: "name",
    })

    static fields() {
        return {
            ...super.fields(),
            level: this.number(),
            parent: this.string(),
            name: this.string(),
            path: this.string(),
            updated: this.string(),
            created: this.string(),
        }
    }
}


export class File extends Owned {
    static entity = "files"
    static meta = new models.Meta({
        app: "ox_files",
        model: "file",
        url: "ox/files/file/",
        title: "name",
    })

    static fields() {
        return {
            ...super.fields(),
            name: this.string(),
            preview: this.string(),
            file: this.string(),
            file_size: this.number(),
            updated: this.string(),
            created: this.string(),
            folder: this.string(),

            description: this.string(),
            caption: this.string(),
            alternate: this.string(),
            ariaDescription: this.string(),

            $folder: this.belongsTo(Folder, "folder")
        }
    }
}
