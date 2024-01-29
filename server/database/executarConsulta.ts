import { ExecutedQuery } from "@planetscale/database";
import type { EventHandlerRequest, H3Event } from "h3";

export async function executarConsulta<T>(
  event: H3Event<EventHandlerRequest>,
  consulta: string,
  parametros?: object,
  opcoes?: object,
): Promise<ExecutedQuery<T>> {
  if (!consulta) {
    throw new Error("executarConsulta: consulta não foi informada!");
  }
  return await event.context
    .obterConexao()
    .execute<T>(consulta, parametros, opcoes);
}
