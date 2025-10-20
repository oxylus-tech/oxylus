import { defineConfig } from 'vitepress'
import fs from 'fs'
import path from 'path'

const sidebarPath = path.resolve(__dirname, './sidebar.generated.json')
const sidebar = JSON.parse(fs.readFileSync(sidebarPath, 'utf-8'))

export default defineConfig({
  title: 'Oxylus Frontend',
  description: 'Technical documentation for Vue components and TS modules',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'API', link: '/api/' }
    ],
    sidebar
  }
})
