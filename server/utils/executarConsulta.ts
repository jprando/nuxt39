import { ExecutedQuery } from "@planetscale/database";
import type { H3Event } from "h3";

export async function executarConsulta<T>(
  event: H3Event,
  consulta: string,
  parametros?: object | any[] | null,
  opcoes?: object,
): Promise<ExecutedQuery<T>> {
  if (!consulta) {
    throw new Error("executarConsulta: consulta nao foi informada!");
  }
  return await event.context
    .obterConexao()
    .execute<T>(consulta, parametros, opcoes);
}
