import { ok } from "node:assert";
import type { Connection } from "@planetscale/database";
import { connect } from "@planetscale/database";
import type { EventHandlerRequest, H3Event } from "h3";

export default defineNitroPlugin((nitro) => {
  nitro.hooks.hook("request", (event: H3Event<EventHandlerRequest>) => {
    event.context.obterConexao = (): Connection => {
      if (!event.context.conexao) {
        const {
          PLANETSCALE_SERVIDOR: host,
          PLANETSCALE_USUARIO: username,
          PLANETSCALE_SENHA: password,
        } = useRuntimeConfig(event);

        ok(host, "planetscale:configuracao:servidor");
        ok(username, "planetscale:configuracao:usuario");
        ok(password, "planetscale:configuracao:senha");

        event.context.conexao = connect({ host, username, password });
      }
      return event.context.conexao;
    };
  });
});
