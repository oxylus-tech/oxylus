import { program } from "commander"


program
    .name("ox-docgen")
    .description("Generate documentation for Oxylus monorepo assets")
    .version("0.1.0")
    .option("-p, --package <pkg>", "Target package")
    .option("-o, --out <dir>", "Output directory")


// run vue-docgen
// run typedoc
// mv api/*/src/* to api/*/*
// copy README's
