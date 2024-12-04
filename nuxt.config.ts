export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@nuxtjs/tailwindcss", "@nuxtjs/google-fonts"],
  googleFonts: {
    families: {
      Lora: {
        wght: [400],
      },
      Poppins: {
        wght: [300, 400, 600],
      },
      Roboto: {
        wght: [400, 500],
      },
    },
  },
});
