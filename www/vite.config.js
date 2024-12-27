import { createVuePlugin } from "vite-plugin-vue2-jsx";
import { defineConfig } from "vite";
import path from "path";
import viteRequireContext from "@originjs/vite-plugin-require-context";
import viteSvgIcons from "vite-plugin-svg-icons";

export default defineConfig({
    server: {
        proxy: {
            "/api": {
                target: "http://localhost:3004/api", // 目标代理接口地址
                changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
                rewrite: (path) => path.replace(/^\/api/, ""),
            },
        },
    },
    css: {
        postcss: {
            plugins: [
                {
                    postcssPlugin: "internal:charset-removal",
                    AtRule: {
                        charset: (atRule) => {
                            if (atRule.name === "charset") {
                                atRule.remove();
                            }
                        },
                    },
                },
            ],
        },
    },
    resolve: {
        extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
        alias: {
            vue: "vue/dist/vue.js",
            "@": path.resolve(__dirname, "src"),
        },
    },
    plugins: [
        createVuePlugin({
            jsx: true,
        }),
        viteSvgIcons({
            iconDirs: [path.resolve(__dirname, "src/icons/svg")],
            symbolId: "icon-[name]",
        }),
        viteRequireContext(),
    ],
});
