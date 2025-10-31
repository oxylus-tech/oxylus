import { exec } from "child_process"
import * as fs from 'node:fs/promises'
import * as path from 'path'
import { resolve } from 'path'
import { promisify } from 'util'
import { program } from "commander"

import { Application, TSConfigReader, TypeDocReader } from 'typedoc'

import docGen_ from 'vue-docgen-cli/lib/docgen.js'
import docGenExtractConfig_ from 'vue-docgen-cli/lib/extractConfig.js'

const asyncExec = promisify(exec)
const docGen = docGen_.default
const docGenExtractConfig = docGenExtractConfig_.default


/** Get markdown title of file (defaults to basename) **/
async function get_title(file) {
    const lines = (await fs.readFile(file, "utf8")).split("\n")
    for(const line of lines)
        if(line.startsWith("# "))
            return line.substr(2).replaceAll('\\', '').trim()
    return path.basename(file, ".md")
}

/** Return whether file exists **/
async function fileExists(path) {
    try { await fs.access(path); return true }
    catch { return false }
}

async function replaceAsync(string, regexp, replacerFunction) {
    const replacements = await Promise.all(
        Array.from(string.matchAll(regexp),
            match => replacerFunction(...match)));
    let i = 0;
    return string.replace(regexp, () => replacements[i++]);
}


class PackageInfo {
    constructor(path) {
        this.path = path
        this.package = null
    }

    get name() { return this.package?.name }

    async load() {
        const data = await fs.readFile(resolve(this.path, "package.json"))
        this.package = JSON.parse(data)
    }

    log(...args) {
        console.log(`\x1b[36m\x1b[1m[${this.name}]\x1b[0m`, ...args)
    }

    /**
     * Generate vue-docgen and return summary (as sidebar nav)
     */
    async docGen(out, config, basePath) {
        config = {
            ...config,
            components: "[A-Z]*.vue",
            componentsRoot: resolve(this.path, "src", "components"),
            outDir: resolve(out, config.outDir || "", this.name, "components"),
        }
        // basePath = path.join(basePath, this.name)

        await docGen(config)

        if(!await fileExists(config.outDir))
            // Nothing generated
            return

        const files = (await fs.readdir(config.outDir)).map(f => path.join(config.outDir, f))
        await this.docGenPostProcess(out, files)
    }

    async docGenPostProcess(out, files) {
        for(const file of files) {
            let content = await fs.readFile(file, 'utf8')
            // Resolve and replace `{@link XXXX}` by a link.
            content = await replaceAsync(content, /\{@link *([^}]+) *}/g, async (text, p1) => {
                let path = await this._resolve_link(out, file, p1)
                return path ? `[${p1}](${path})` : text
            })

            await fs.writeFile(file, content)
        }
    }

    async _resolve_link(out, file, name) {
        const cwds = [
            path.resolve(file, '..', '..'),
            out,
        ]

        for(const cwd of cwds) {
            const fileDir = path.resolve(file, '..')
            for await (const match of fs.glob(`**/${name}.md`, {cwd}))
                return path.relative(fileDir, path.join(cwd, match))
        }
    }
}


class DocGenerator {
    path = null
    out = "docs"
    vueOptions = "./docgen.config.cjs"
    typedocOptions = "./typedoc.json"
    basePath = "/"
    noTypedoc = false
    noVue = false

    vueConf = null
    typedocConf = null
    packages = []

    constructor(options) {
        Object.assign(this, options)

        const keys = ["path", "out", "vueOptions", "typedocOptions"]
        for(const key of keys)
            this[key] = resolve(this[key])
    }

    /** Load configs and packages infos */
    async load() {
        await this.loadPackages()

        // --- docgen & typedoc conf
        this.vueConf = {
            ...(await docGenExtractConfig(
            process.cwd(), false, this.vueOptions, [null, null], true, null)),
            outDir: resolve(this.out, "api")
        }
        this.vueConf.apiOptions = {
            ...this.vueConf.apiOptions,
            ...vueApiOptions
        }

        this.typedocConf = {
            ...JSON.parse(await fs.readFile(this.typedocOptions)),
            entryFileName: "index",
            theme: "markdown",
            out: resolve(this.out, "api"),
            docsRoot: this.out,
        }
        // ensure plugins
        this.typedocConf.plugin = [...new Set(
            [...this.typedocConf.plugin, "typedoc-plugin-markdown", "typedoc-vitepress-theme"]
        )]

        // TODO: check conf values
    }

    /** Load packages **/
    async loadPackages() {
        let lookup = `${this.path}/package.json`
        this.packages = []
        for await (const entry of fs.glob(lookup))
            this.packages.push(new PackageInfo(path.dirname(entry)))

        lookup = `${this.path}/*/package.json`
        for await (const entry of fs.glob(lookup))
            this.packages.push(new PackageInfo(path.dirname(entry)))

        await Promise.all(this.packages.map(v => v.load()))
    }

    /** Execute shell command **/
    async exec(cmd) {
        try {
            const {error, stdout, stderr} = await asyncExec(cmd)
            error && console.log("Exec error:", error)
            stdout && console.log(stdout)
            stderr && console.log(`\x1b[31m${stderr}\x1b[0m`)
            await process
        }
        catch(e) {
            console.log("\x1b[31m[ERROR]\x1b[0m", e)
        }
    }


    async run() {
        await this.load()

        console.log("🐑🐣 Start generating documentation... 🐥🐏")
        console.log(`- packages: ${this.packages.length} found`)
        console.log(`- docs dir: ${this.out}`)
        console.log(`- vue-docgen config: ${this.vueOptions}`)
        console.log(`- typedoc config: ${this.typedocOptions}`)
        console.log("")

        !this.dontTypedoc && await this.typedoc(this.typedocConf)
        !this.dontVue && await this.docGen(this.vueConf, this.basePath)

        console.log("\n🦆 Generate sidebar")
        await this.makeSidebar(
            this.out, this.basePath,
            path.join(this.out, ".vitepress", "sidebar.json"),
            [
                ["/api/", "API", resolve(this.out, "api")],
                ["/guide/", "Guide", resolve(this.out, "guide")],
            ]
        )
    }

    async typedoc(config) {
        // We run as a general one
        console.log("\n🪴 Run typedoc")

        // TODO: handle single package
        if(config.entryPointStrategy != "packages")
            throw "Typedoc's entryPointStrategy must be `packages`"

        const app = await Application.bootstrapWithPlugins(config)

        app.options.addReader(new TSConfigReader());
        app.options.addReader(new TypeDocReader());

        const project = await app.convert()
        if(project) {
            await app.generateOutputs(project)
            console.log(`✅ Typedoc done!`);
        }
    }

    async docGen(config, basePath) {
        console.log("🌱 Run vue-docgen")
        for(const pack of this.packages)
            await pack.docGen(
                path.join(this.out, "components"),
                config,
                basePath
            )
        console.log("✅ Dogen ran over", this.packages.length, "packages");
    }

    async makeSidebar(baseDir, basePath, outFile, specs) {
        const sidebar = {}

        // From specs
        for(let [url, text, dir] of specs) {
            url = path.join(basePath, url)
            let items = await this._generateSidebar(dir, url)
            if(items)
                sidebar[url] = items
        }
        await fs.writeFile(outFile, JSON.stringify(sidebar))
        console.log(`✅ Sidebar written to`, outFile);
    }

    async _generateSidebar(dir, basePath, {done=new Set(), recurse=true, depth=0}={}) {
        if(!await fileExists(dir))
            return

        const files = await fs.readdir(dir)
        const promises = files.map(async file => {
            const fullPath = resolve(path.join(dir, file))
            if(done.has(fullPath))
                return

            const stat = await fs.stat(fullPath)
            if(recurse && stat.isDirectory()) {
                done.add(fullPath)

                // dir: - check for the existence of an index
                //      - recurse
                let obj = { text: file, collapsed: depth < 1 ? false : true}
                const indexPath = resolve(fullPath, "index.md")
                if(await fileExists(indexPath)) {
                    done.add(indexPath)
                    obj = {
                        ...obj,
                        text: await get_title(indexPath),
                        link: path.join(basePath, file, 'index.md').replace(/\\/g, '/')
                    }
                }
                obj.items = await this._generateSidebar(fullPath, path.join(basePath, file), {done, depth: depth+1})

                return obj
            }
            else if(stat.isFile() && file.endsWith('.md'))
                return {
                    text: await get_title(fullPath),
                    link: path.join(basePath, file).replace(/\\/g, '/')
                }
        })

        let items = await Promise.all(promises)
        items = items.filter(v => v)
        this._sort_sidebar_items(items)
        return items
    }

    _sort_sidebar_items(items) {
        items.sort((a, b) => {
            [a, b] = [a.text.toLowerCase(), b.text.toLowerCase()]
            if(a < b) return -1
            if(a > b) return 1
            return 0
        })
    }
}




const opts = {}

program
    .name("ox-docgen")
    .description("Generate documentation for Oxylus monorepo assets")
    .version("0.1.0")
    .option("-v, --vue-options <path>", "Vue Docgen configuration file", "./docgen.config.cjs")
    .option("-t, --typedoc-options <path>", "Typedoc configuration file", "./typedoc.json")
    .option("-o, --out <dir>", "Documentation root dir.")
    .option("-b, --base-path <path>", "URLs base path.", "/")
    .option("--dont-typedoc", "Don't generate doc from typedoc", false)
    .option("--dont-vue", "Don't generate doc vue components", false)
    .arguments("<packages> <out>")
    .action(function(path, out) {
        opts.path = path
        opts.out = out
    })
    .parse()

const gen = new DocGenerator({
    ...opts,
    ...program.opts()
})
gen.run()


// --------------------------------------------------------------------
const vueApiOptions = {
    addScriptHandlers: [
        function (
            documentation,
            componentDefinition,
            astPath,
            opt
        ) {
            const componentDoc = astPath.tokens
                .filter(
                    token => token.type === 'CommentBlock' &&
                    token.value.includes('@component')
                )
                .find(() => true);
            if(componentDoc) {
                const text = componentDoc.value
                    .replace(/@component */, "")
                    .replaceAll(/\n *\* ?/g, "\n")
                    .replace(/^[*\n ]*/, "")
                    .replace(/[*\n ]*$/, "")
                documentation.set('description', text);
            }
        }
      ]
}
