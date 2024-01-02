declare module "nuxt/schema" {
  interface RuntimeConfig {
    PLANETSCALE_SERVIDOR: string;
    PLANETSCALE_USUARIO: string;
    PLANETSCALE_SENHA: string;
  }
  // interface PublicRuntimeConfig {
  //   apiBase: string
  // }
}

export {};
