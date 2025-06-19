// vite.config.js
import { defineConfig as defineConfig2, mergeConfig } from "file:///media/data/code/projets/oxylus/oxylus/assets/node_modules/.pnpm/vite@5.4.19_sass@1.89.2/node_modules/vite/dist/node/index.js";

// ../../vite.config.base.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///media/data/code/projets/oxylus/oxylus/assets/node_modules/.pnpm/vite@5.4.19_sass@1.89.2/node_modules/vite/dist/node/index.js";
import vue from "file:///media/data/code/projets/oxylus/oxylus/assets/node_modules/.pnpm/@vitejs+plugin-vue@5.2.4_vite@5.4.19_sass@1.89.2__vue@3.5.16_typescript@5.8.3_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vuetify from "file:///media/data/code/projets/oxylus/oxylus/assets/node_modules/.pnpm/vite-plugin-vuetify@2.1.1_vite@5.4.19_sass@1.89.2__vue@3.5.16_typescript@5.8.3__vuetify@3.8.9/node_modules/vite-plugin-vuetify/dist/index.mjs";
import commonjs from "file:///media/data/code/projets/oxylus/oxylus/assets/node_modules/.pnpm/@rollup+plugin-commonjs@25.0.8_rollup@4.43.0/node_modules/@rollup/plugin-commonjs/dist/es/index.js";
var __vite_injected_original_import_meta_url = "file:///media/data/code/projets/oxylus/oxylus/assets/vite.config.base.ts";
var staticRoot = fileURLToPath(new URL("../ox/static", __vite_injected_original_import_meta_url));
var vite_config_base_default = defineConfig({
  plugins: [
    vue(),
    vuetify({ autoImport: true })
  ],
  build: {
    sourcemap: true,
    optimizeDeps: {
      include: ["vuetify"]
    },
    rollupOptions: {
      external: ["vue", "vuex", "axios", "ox", "ox/app", "ox/components", "ox/vendor"],
      input: {
        index: "src/index.ts"
        // sfc: "src/sfc.ts",
      },
      output: {
        globals: {
          vue: "Vue",
          vuetify: "Vuetify"
        },
        manualChunks: (id) => {
          if (id.includes("vuetify"))
            return "vuetify";
        },
        assetFileNames: "[name].[ext]",
        chunkFileNames: "[name].js",
        entryFileNames: "[name].js"
      },
      plugins: [commonjs()]
    }
  },
  css: {
    devSourcemap: true
  },
  resolve: {
    extensions: [".js", ".ts", ".json", ".vue", ".scss"],
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
      //'@ox': fileURLToPath(new URL('./ox/src/', import.meta.url)),
      //'@ox_locations': fileURLToPath(new URL('./@ox/locations/src/', import.meta.url)),
    }
  }
});

// vite.config.js
var vite_config_default = mergeConfig(
  vite_config_base_default,
  defineConfig2({
    base: "static/ox_mails",
    build: {
      outDir: `${staticRoot}/ox_mails/`
    }
  })
);
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiLCAiLi4vLi4vdml0ZS5jb25maWcuYmFzZS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9tZWRpYS9kYXRhL2NvZGUvcHJvamV0cy9veHlsdXMvb3h5bHVzL2Fzc2V0cy9Ab3gvbWFpbHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9tZWRpYS9kYXRhL2NvZGUvcHJvamV0cy9veHlsdXMvb3h5bHVzL2Fzc2V0cy9Ab3gvbWFpbHMvdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL21lZGlhL2RhdGEvY29kZS9wcm9qZXRzL294eWx1cy9veHlsdXMvYXNzZXRzL0BveC9tYWlscy92aXRlLmNvbmZpZy5qc1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZywgbWVyZ2VDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IGJhc2VDb25maWcsIHtzdGF0aWNSb290fSBmcm9tICcuLi8uLi92aXRlLmNvbmZpZy5iYXNlLnRzJ1xuXG5cbmV4cG9ydCBkZWZhdWx0IG1lcmdlQ29uZmlnKFxuICAgIGJhc2VDb25maWcsXG4gICAgZGVmaW5lQ29uZmlnKHtcbiAgICAgICAgYmFzZTogJ3N0YXRpYy9veF9tYWlscycsXG4gICAgICAgIGJ1aWxkOiB7XG4gICAgICAgICAgICBvdXREaXI6IGAke3N0YXRpY1Jvb3R9L294X21haWxzL2AsXG4gICAgICAgIH0sXG4gICAgfSlcbilcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL21lZGlhL2RhdGEvY29kZS9wcm9qZXRzL294eWx1cy9veHlsdXMvYXNzZXRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvbWVkaWEvZGF0YS9jb2RlL3Byb2pldHMvb3h5bHVzL294eWx1cy9hc3NldHMvdml0ZS5jb25maWcuYmFzZS50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vbWVkaWEvZGF0YS9jb2RlL3Byb2pldHMvb3h5bHVzL294eWx1cy9hc3NldHMvdml0ZS5jb25maWcuYmFzZS50c1wiO2ltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJ1xuaW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXG5cbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcbmltcG9ydCB2dWV0aWZ5IGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZXRpZnknXG5pbXBvcnQgY29tbW9uanMgZnJvbSAnQHJvbGx1cC9wbHVnaW4tY29tbW9uanMnO1xuXG5cbmV4cG9ydCBjb25zdCBzdGF0aWNSb290ID0gZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuLi9veC9zdGF0aWMnLCBpbXBvcnQubWV0YS51cmwpKVxuXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICAgIHBsdWdpbnM6IFtcbiAgICAgICAgdnVlKCksXG4gICAgICAgIHZ1ZXRpZnkoeyBhdXRvSW1wb3J0OiB0cnVlIH0pLFxuICAgIF0sXG4gICAgYnVpbGQ6IHtcbiAgICAgICAgc291cmNlbWFwOiB0cnVlLFxuXG4gICAgICAgIG9wdGltaXplRGVwczoge1xuICAgICAgICAgICAgaW5jbHVkZTogWyd2dWV0aWZ5J10sXG4gICAgICAgIH0sXG5cbiAgICAgICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgICAgICAgZXh0ZXJuYWw6IFsndnVlJywgJ3Z1ZXgnLCAnYXhpb3MnLCAnb3gnLCAnb3gvYXBwJywgJ294L2NvbXBvbmVudHMnLCAnb3gvdmVuZG9yJ10sXG4gICAgICAgICAgICBpbnB1dDoge1xuICAgICAgICAgICAgICAgIGluZGV4OiBcInNyYy9pbmRleC50c1wiLFxuICAgICAgICAgICAgICAgIC8vIHNmYzogXCJzcmMvc2ZjLnRzXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb3V0cHV0OiB7XG4gICAgICAgICAgICAgICAgZ2xvYmFsczoge1xuICAgICAgICAgICAgICAgICAgICB2dWU6ICdWdWUnLFxuICAgICAgICAgICAgICAgICAgICB2dWV0aWZ5OiAnVnVldGlmeScsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBtYW51YWxDaHVua3M6IChpZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZihpZC5pbmNsdWRlcyhcInZ1ZXRpZnlcIikpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJ2dWV0aWZ5XCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGFzc2V0RmlsZU5hbWVzOiBcIltuYW1lXS5bZXh0XVwiLFxuICAgICAgICAgICAgICAgIGNodW5rRmlsZU5hbWVzOiBcIltuYW1lXS5qc1wiLFxuICAgICAgICAgICAgICAgIGVudHJ5RmlsZU5hbWVzOiBcIltuYW1lXS5qc1wiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBsdWdpbnM6IFtjb21tb25qcygpXSxcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIGNzczoge1xuICAgICAgICBkZXZTb3VyY2VtYXA6IHRydWUsXG4gICAgfSxcbiAgICByZXNvbHZlOiB7XG4gICAgICAgIGV4dGVuc2lvbnM6IFsnLmpzJywgJy50cycsICcuanNvbicsICcudnVlJywgJy5zY3NzJ10sXG4gICAgICAgIGFsaWFzOiB7XG4gICAgICAgICAgICAnQCc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKSxcbiAgICAgICAgICAgIC8vJ0BveCc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9veC9zcmMvJywgaW1wb3J0Lm1ldGEudXJsKSksXG4gICAgICAgICAgICAvLydAb3hfbG9jYXRpb25zJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL0BveC9sb2NhdGlvbnMvc3JjLycsIGltcG9ydC5tZXRhLnVybCkpLFxuICAgICAgICB9XG4gICAgfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBdVYsU0FBUyxnQkFBQUEsZUFBYyxtQkFBbUI7OztBQ0NqWSxTQUFTLGVBQWUsV0FBVztBQUVuQyxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7QUFDaEIsT0FBTyxhQUFhO0FBQ3BCLE9BQU8sY0FBYztBQU5rTCxJQUFNLDJDQUEyQztBQVNqUCxJQUFNLGFBQWEsY0FBYyxJQUFJLElBQUksZ0JBQWdCLHdDQUFlLENBQUM7QUFJaEYsSUFBTywyQkFBUSxhQUFhO0FBQUEsRUFDeEIsU0FBUztBQUFBLElBQ0wsSUFBSTtBQUFBLElBQ0osUUFBUSxFQUFFLFlBQVksS0FBSyxDQUFDO0FBQUEsRUFDaEM7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNILFdBQVc7QUFBQSxJQUVYLGNBQWM7QUFBQSxNQUNWLFNBQVMsQ0FBQyxTQUFTO0FBQUEsSUFDdkI7QUFBQSxJQUVBLGVBQWU7QUFBQSxNQUNYLFVBQVUsQ0FBQyxPQUFPLFFBQVEsU0FBUyxNQUFNLFVBQVUsaUJBQWlCLFdBQVc7QUFBQSxNQUMvRSxPQUFPO0FBQUEsUUFDSCxPQUFPO0FBQUE7QUFBQSxNQUVYO0FBQUEsTUFDQSxRQUFRO0FBQUEsUUFDSixTQUFTO0FBQUEsVUFDTCxLQUFLO0FBQUEsVUFDTCxTQUFTO0FBQUEsUUFDYjtBQUFBLFFBQ0EsY0FBYyxDQUFDLE9BQU87QUFDbEIsY0FBRyxHQUFHLFNBQVMsU0FBUztBQUNwQixtQkFBTztBQUFBLFFBQ2Y7QUFBQSxRQUNBLGdCQUFnQjtBQUFBLFFBQ2hCLGdCQUFnQjtBQUFBLFFBQ2hCLGdCQUFnQjtBQUFBLE1BQ3BCO0FBQUEsTUFDQSxTQUFTLENBQUMsU0FBUyxDQUFDO0FBQUEsSUFDeEI7QUFBQSxFQUNKO0FBQUEsRUFDQSxLQUFLO0FBQUEsSUFDRCxjQUFjO0FBQUEsRUFDbEI7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNMLFlBQVksQ0FBQyxPQUFPLE9BQU8sU0FBUyxRQUFRLE9BQU87QUFBQSxJQUNuRCxPQUFPO0FBQUEsTUFDSCxLQUFLLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBO0FBQUE7QUFBQSxJQUd4RDtBQUFBLEVBQ0o7QUFDSixDQUFDOzs7QUR0REQsSUFBTyxzQkFBUTtBQUFBLEVBQ1g7QUFBQSxFQUNBQyxjQUFhO0FBQUEsSUFDVCxNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsTUFDSCxRQUFRLEdBQUcsVUFBVTtBQUFBLElBQ3pCO0FBQUEsRUFDSixDQUFDO0FBQ0w7IiwKICAibmFtZXMiOiBbImRlZmluZUNvbmZpZyIsICJkZWZpbmVDb25maWciXQp9Cg==
