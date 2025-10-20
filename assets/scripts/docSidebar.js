const fs = require('fs')
const path = require('path')


function generateSidebar(dir, basePath) {
    const files = fs.readdirSync(dir)
    const items = []

    files.forEach(file => {
        const fullPath = path.join(dir, file)
        const stat = fs.statSync(fullPath)

        if (stat.isDirectory()) {
            items.push({
                text: file,
                items: generateSidebar(fullPath, path.join(basePath, file))
            })
        } else if (file.endsWith('.md')) {
            const name = path.basename(file, '.md')
            items.push({
                text: name,
                link: path.join(basePath, file).replace(/\\/g, '/')
            })
        }
    })

    return items
}

// Paths
const componentsDir = path.resolve(__dirname, '../docs/api/components')
const tsDir = path.resolve(__dirname, '../docs/api/ts')

const sidebar = [
    {
        text: 'Components',
        items: generateSidebar(componentsDir, '/api/components')
    },
    {
        text: 'Composables & Core TS',
        items: generateSidebar(tsDir, '/api/ts')
    }
]

// Write to config file
const configPath = path.resolve(__dirname, '../docs/.vitepress/sidebar.generated.json')
fs.writeFileSync(configPath, JSON.stringify(sidebar, null, 2))
console.log('Sidebar generated at', configPath)
