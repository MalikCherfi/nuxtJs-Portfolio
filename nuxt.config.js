require("dotenv").config();

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "nuxtTest",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { layout: "default" },
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "bootstrap-css-only/css/bootstrap.min.css",
    "mdbvue/lib/css/mdb.min.css",
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/dotenv", "mdbvue/nuxt"],

  mdbvue: {
    icons: true, // FA5
    roboto: true, // font Roboto
    css: true, // MDB CSS
    bootstrap: true, // Bootstrap CSS
  },

  env: {
    VUE_APP_API_URL: process.env.VUE_APP_API_URL || "http://localhost:3000",
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, ctx) {},
    transpile: ["mdbvue/lib/components"],
  },
};
