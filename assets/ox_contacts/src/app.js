
import OxApp from 'ox/app.js'
import {useAppData, useModels, useContext} from 'ox/composables'
import * as authModels from 'ox/models/auth'
import * as components from './components'


export default {
    delimiters: ['[[', ']]'],
    extends: OxApp,
    components,

    setup(props) {
        const {repos, models} = useModels(authModels)
        const appData = useAppData()
        const context = useContext({
            appData,
            repos: repos,
        })
        return { repos, models, context }
    },

    data() {
        return {
            tabs: {
                user: null,
            },
        }
    },

    computed: {
        users() { return this.repos.users.with("groups").with("permissions").get() },
        groups() { return this.repos.groups.with("permissions").get() },

        groupUsers() {
            return this.users.filter()
        }
    },

    methods: {
        async fetchBase() {
            await this.repos.contentTypes.api().get("ox/core/content_type/")
            await this.repos.permissions.api().get("ox/core/permission/")
        },

        fetchGroups() {
            return this.repos.groups.api().get("ox/core/group/")
        },

        fetchUsers() {
            return this.repos.users.api().get("ox/core/user/", {dataKey: "results"})
        },
    },

    async mounted() {
        this.loading = true
        await this.fetchBase()
        await this.fetchGroups()
        await this.fetchUsers()
        this.loading = false
    },
}
