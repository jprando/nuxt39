import type { EventHandlerRequest, H3Event } from "h3";
import { consultarPessoaPorNome, executarConsulta } from "~/server/database";
import { pessoaNomeJaExiste } from "~/server/error";

export async function validarPessoaNomeJaExiste(
  event: H3Event<EventHandlerRequest>,
  nome: string,
) {
  const parametros = { nome };
  const { size: nomeJaExiste } = await executarConsulta(
    event,
    consultarPessoaPorNome,
    parametros,
  );
  if (nomeJaExiste) {
    throw createError(pessoaNomeJaExiste);
  }
}
