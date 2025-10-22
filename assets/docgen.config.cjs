const path = require('path');

const outDir = path.resolve(__dirname, './docs/api')

module.exports = {
    componentsRoot: path.resolve(__dirname),
    components: 'packages/*/src/components/**/[a-zA-Z]*.vue',
    outDir: outDir,
    apiOptions: {
        alias: {
            '@oxylus/ox': path.resolve(__dirname, 'packages/ox/src/index.ts'),
        },
        jsx: false,
    },

    getDestFile: (componentPath) => {
        const parsed = path.parse(componentPath)

        const parts = componentPath.split(path.sep)
        const oxylusIndex = parts.indexOf('packages')
        if (oxylusIndex === -1)
            return `${parsed.name}.md`

        const packageName = parts[oxylusIndex + 1]  // e.g., contacts
        const componentName = parsed.name            // OxKindInput
        const result = path.join(outDir, packageName, 'src', 'components', `${componentName}.md`)
        console.log(result)
        return result
    }
};
