import type { EventHandlerRequest, H3Event } from "h3";
import { consultarPessoas, executarConsulta } from "~/server/database";
import type { Pessoa } from "~/server/types";

export async function obterPessoas(event: H3Event<EventHandlerRequest>) {
  const { rows } = await executarConsulta<Pessoa>(event, consultarPessoas);
  return rows;
}
