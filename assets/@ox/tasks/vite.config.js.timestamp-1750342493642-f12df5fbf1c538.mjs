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
    base: "static/ox_tasks",
    build: {
      outDir: `${staticRoot}/ox_tasks/`
    }
  })
);
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiLCAiLi4vLi4vdml0ZS5jb25maWcuYmFzZS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9tZWRpYS9kYXRhL2NvZGUvcHJvamV0cy9veHlsdXMvb3h5bHVzL2Fzc2V0cy9Ab3gvdGFza3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9tZWRpYS9kYXRhL2NvZGUvcHJvamV0cy9veHlsdXMvb3h5bHVzL2Fzc2V0cy9Ab3gvdGFza3Mvdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL21lZGlhL2RhdGEvY29kZS9wcm9qZXRzL294eWx1cy9veHlsdXMvYXNzZXRzL0BveC90YXNrcy92aXRlLmNvbmZpZy5qc1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZywgbWVyZ2VDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IGJhc2VDb25maWcsIHtzdGF0aWNSb290fSBmcm9tICcuLi8uLi92aXRlLmNvbmZpZy5iYXNlLnRzJ1xuXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBtZXJnZUNvbmZpZyhcbiAgICBiYXNlQ29uZmlnLFxuICAgIGRlZmluZUNvbmZpZyh7XG4gICAgICAgIGJhc2U6ICdzdGF0aWMvb3hfdGFza3MnLFxuICAgICAgICBidWlsZDoge1xuICAgICAgICAgICAgb3V0RGlyOiBgJHtzdGF0aWNSb290fS9veF90YXNrcy9gLFxuICAgICAgICB9LFxuICAgIH0pXG4pXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9tZWRpYS9kYXRhL2NvZGUvcHJvamV0cy9veHlsdXMvb3h5bHVzL2Fzc2V0c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL21lZGlhL2RhdGEvY29kZS9wcm9qZXRzL294eWx1cy9veHlsdXMvYXNzZXRzL3ZpdGUuY29uZmlnLmJhc2UudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL21lZGlhL2RhdGEvY29kZS9wcm9qZXRzL294eWx1cy9veHlsdXMvYXNzZXRzL3ZpdGUuY29uZmlnLmJhc2UudHNcIjtpbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCdcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGgsIFVSTCB9IGZyb20gJ25vZGU6dXJsJ1xuXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgdnVldGlmeSBmcm9tICd2aXRlLXBsdWdpbi12dWV0aWZ5J1xuaW1wb3J0IGNvbW1vbmpzIGZyb20gJ0Byb2xsdXAvcGx1Z2luLWNvbW1vbmpzJztcblxuXG5leHBvcnQgY29uc3Qgc3RhdGljUm9vdCA9IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi4vb3gvc3RhdGljJywgaW1wb3J0Lm1ldGEudXJsKSlcblxuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgICBwbHVnaW5zOiBbXG4gICAgICAgIHZ1ZSgpLFxuICAgICAgICB2dWV0aWZ5KHsgYXV0b0ltcG9ydDogdHJ1ZSB9KSxcbiAgICBdLFxuICAgIGJ1aWxkOiB7XG4gICAgICAgIHNvdXJjZW1hcDogdHJ1ZSxcblxuICAgICAgICBvcHRpbWl6ZURlcHM6IHtcbiAgICAgICAgICAgIGluY2x1ZGU6IFsndnVldGlmeSddLFxuICAgICAgICB9LFxuXG4gICAgICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgICAgICAgIGV4dGVybmFsOiBbJ3Z1ZScsICd2dWV4JywgJ2F4aW9zJywgJ294JywgJ294L2FwcCcsICdveC9jb21wb25lbnRzJywgJ294L3ZlbmRvciddLFxuICAgICAgICAgICAgaW5wdXQ6IHtcbiAgICAgICAgICAgICAgICBpbmRleDogXCJzcmMvaW5kZXgudHNcIixcbiAgICAgICAgICAgICAgICAvLyBzZmM6IFwic3JjL3NmYy50c1wiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG91dHB1dDoge1xuICAgICAgICAgICAgICAgIGdsb2JhbHM6IHtcbiAgICAgICAgICAgICAgICAgICAgdnVlOiAnVnVlJyxcbiAgICAgICAgICAgICAgICAgICAgdnVldGlmeTogJ1Z1ZXRpZnknLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbWFudWFsQ2h1bmtzOiAoaWQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYoaWQuaW5jbHVkZXMoXCJ2dWV0aWZ5XCIpKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwidnVldGlmeVwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBhc3NldEZpbGVOYW1lczogXCJbbmFtZV0uW2V4dF1cIixcbiAgICAgICAgICAgICAgICBjaHVua0ZpbGVOYW1lczogXCJbbmFtZV0uanNcIixcbiAgICAgICAgICAgICAgICBlbnRyeUZpbGVOYW1lczogXCJbbmFtZV0uanNcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwbHVnaW5zOiBbY29tbW9uanMoKV0sXG4gICAgICAgIH0sXG4gICAgfSxcbiAgICBjc3M6IHtcbiAgICAgICAgZGV2U291cmNlbWFwOiB0cnVlLFxuICAgIH0sXG4gICAgcmVzb2x2ZToge1xuICAgICAgICBleHRlbnNpb25zOiBbJy5qcycsICcudHMnLCAnLmpzb24nLCAnLnZ1ZScsICcuc2NzcyddLFxuICAgICAgICBhbGlhczoge1xuICAgICAgICAgICAgJ0AnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjJywgaW1wb3J0Lm1ldGEudXJsKSksXG4gICAgICAgICAgICAvLydAb3gnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vb3gvc3JjLycsIGltcG9ydC5tZXRhLnVybCkpLFxuICAgICAgICAgICAgLy8nQG94X2xvY2F0aW9ucyc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9Ab3gvbG9jYXRpb25zL3NyYy8nLCBpbXBvcnQubWV0YS51cmwpKSxcbiAgICAgICAgfVxuICAgIH1cbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXVWLFNBQVMsZ0JBQUFBLGVBQWMsbUJBQW1COzs7QUNDalksU0FBUyxlQUFlLFdBQVc7QUFFbkMsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sYUFBYTtBQUNwQixPQUFPLGNBQWM7QUFOa0wsSUFBTSwyQ0FBMkM7QUFTalAsSUFBTSxhQUFhLGNBQWMsSUFBSSxJQUFJLGdCQUFnQix3Q0FBZSxDQUFDO0FBSWhGLElBQU8sMkJBQVEsYUFBYTtBQUFBLEVBQ3hCLFNBQVM7QUFBQSxJQUNMLElBQUk7QUFBQSxJQUNKLFFBQVEsRUFBRSxZQUFZLEtBQUssQ0FBQztBQUFBLEVBQ2hDO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDSCxXQUFXO0FBQUEsSUFFWCxjQUFjO0FBQUEsTUFDVixTQUFTLENBQUMsU0FBUztBQUFBLElBQ3ZCO0FBQUEsSUFFQSxlQUFlO0FBQUEsTUFDWCxVQUFVLENBQUMsT0FBTyxRQUFRLFNBQVMsTUFBTSxVQUFVLGlCQUFpQixXQUFXO0FBQUEsTUFDL0UsT0FBTztBQUFBLFFBQ0gsT0FBTztBQUFBO0FBQUEsTUFFWDtBQUFBLE1BQ0EsUUFBUTtBQUFBLFFBQ0osU0FBUztBQUFBLFVBQ0wsS0FBSztBQUFBLFVBQ0wsU0FBUztBQUFBLFFBQ2I7QUFBQSxRQUNBLGNBQWMsQ0FBQyxPQUFPO0FBQ2xCLGNBQUcsR0FBRyxTQUFTLFNBQVM7QUFDcEIsbUJBQU87QUFBQSxRQUNmO0FBQUEsUUFDQSxnQkFBZ0I7QUFBQSxRQUNoQixnQkFBZ0I7QUFBQSxRQUNoQixnQkFBZ0I7QUFBQSxNQUNwQjtBQUFBLE1BQ0EsU0FBUyxDQUFDLFNBQVMsQ0FBQztBQUFBLElBQ3hCO0FBQUEsRUFDSjtBQUFBLEVBQ0EsS0FBSztBQUFBLElBQ0QsY0FBYztBQUFBLEVBQ2xCO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDTCxZQUFZLENBQUMsT0FBTyxPQUFPLFNBQVMsUUFBUSxPQUFPO0FBQUEsSUFDbkQsT0FBTztBQUFBLE1BQ0gsS0FBSyxjQUFjLElBQUksSUFBSSxTQUFTLHdDQUFlLENBQUM7QUFBQTtBQUFBO0FBQUEsSUFHeEQ7QUFBQSxFQUNKO0FBQ0osQ0FBQzs7O0FEckRELElBQU8sc0JBQVE7QUFBQSxFQUNYO0FBQUEsRUFDQUMsY0FBYTtBQUFBLElBQ1QsTUFBTTtBQUFBLElBQ04sT0FBTztBQUFBLE1BQ0gsUUFBUSxHQUFHLFVBQVU7QUFBQSxJQUN6QjtBQUFBLEVBQ0osQ0FBQztBQUNMOyIsCiAgIm5hbWVzIjogWyJkZWZpbmVDb25maWciLCAiZGVmaW5lQ29uZmlnIl0KfQo=
