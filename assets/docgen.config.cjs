const path = require('path')
const fs = require('fs')

const outDir = path.resolve(__dirname, './docs/components')


const packages = {}

function getPackageName(baseDir, filePath) {
    const parts = filePath.split(path.sep)
    const baseIndex = parts.indexOf(baseDir)
    parts.splice(baseIndex+2)

    packagePath = parts.join('/')
    if(!packages[packagePath]) {
        const package = JSON.parse(fs.readFileSync(path.resolve(packagePath, "package.json")))["name"]
        packages[packagePath] = package
    }
    return packages[packagePath]
}


module.exports = {
    componentsRoot: path.resolve(__dirname),
    /** This is an extra field used to specify where are mono-repo packages */
    // baseDir: 'packages',
    components: '**/[a-zA-Z]*.vue',
    outDir: outDir,
    apiOptions: {
        alias: {
            '@oxylus/ox': path.resolve(__dirname, 'packages/ox/src/index.ts'),
        },
        jsx: false,
    },

    __getDestFile: (componentPath) => {
        const parsed = path.parse(componentPath)
        const name = getPackageName("packages", componentPath).replace('/', path.sep)
        const result = path.join(outDir, name, 'components', `${parsed.name}.md`)
        console.log(result)
        return result
    }
};
