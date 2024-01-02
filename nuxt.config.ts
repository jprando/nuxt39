// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  sourcemap: true,
  devtools: { enabled: true },
  runtimeConfig: {
    PLANETSCALE_SERVIDOR: "",
    PLANETSCALE_USUARIO: "",
    PLANETSCALE_SENHA: "",
  },
});
