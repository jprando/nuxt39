import type { EventHandlerRequest, H3Event } from "h3";
import { consultarPessoaPorId, executarConsulta } from "~/server/database";
import type { Pessoa } from "~/server/types";

export async function obterPessoaPorId(
  event: H3Event<EventHandlerRequest>,
  id: number,
) {
  const parametros = { id };
  const { rows } = await executarConsulta<Pessoa>(
    event,
    consultarPessoaPorId,
    parametros,
  );
  const [pessoa] = rows;
  return pessoa;
}
