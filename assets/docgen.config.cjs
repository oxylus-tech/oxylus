const path = require('path');

module.exports = {
    componentsRoot: path.resolve(__dirname),
    components: '@oxylus/*/src/components/**/[A-Z]*.vue',
    outDir: path.resolve(__dirname, './docs/api'), // notice: up one level to docs package
    apiOptions: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
        jsx: false,
    },

    getDestFile: (componentPath) => {
        const parsed = path.parse(componentPath)

        const parts = componentPath.split(path.sep)
        const oxylusIndex = parts.indexOf('@oxylus')
        console.log(">>>", oxylusIndex, parts, parsed.name)
        if (oxylusIndex === -1)
            return `${parsed.name}.md`

        const packageName = parts[oxylusIndex + 1]  // e.g., contacts
        const componentName = parsed.name            // OxKindInput
        const result = path.join('@oxylus', packageName, 'components', `${componentName}.md`)
        return result
    }
};
