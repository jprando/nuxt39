import type { Connection } from "@planetscale/database";

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

declare module "h3" {
  interface H3EventContext {
    conexao: Connection;
    obterConexao: () => Connection;
    executarConsulta: Connection["execute"];
  }
}

export {};
