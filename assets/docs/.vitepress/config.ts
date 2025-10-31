import * as fs from 'fs'
import { resolve } from 'path'
import { defineConfig } from 'vitepress'

const sidebar = JSON.parse(fs.readFileSync(
    resolve(__dirname, "sidebar.json")
))

export default defineConfig({
    title: '@oxylus documentation',
    description: 'Technical documentation for Vue components and TS modules',
    srcDirs: resolve(__dirname, '..'),
    themeConfig: {
        nav: [
            // { text: 'Home', link: '/' },
            { text: 'Guide', link: '/guide/' },
            { text: 'API', link: '/api/' },
        ],
        sidebar
    }
})
