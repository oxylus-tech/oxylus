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

    /** File size as human readable string. */
    get displaySize(): string {
        return formatBytes(this.file_size)
    }
}


/** Return a human readable version of size
 *
 * @param bytes - size in bytes
 * @param decimal - decimal count
 */
export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0)
      return '0'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  const value = parseFloat((bytes / Math.pow(k, i)).toFixed(dm))
  return `${value} ${sizes[i]}`
}
