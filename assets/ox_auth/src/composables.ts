import {models as oxModels, useModels} from 'ox'

export function useAuthModels(extra_models : Array<models.Model> =[]) : Object {
    const {repos, models} = useModels([
        oxModels.User, oxModels.Group, oxModels.Permission, oxModels.ContentType,
        ...extra_models
    ])

    repos.contentTypes.api().get("ox/core/content_type/")
    repos.permissions.api().get("ox/core/permission/")

    return {repos, models}
}
