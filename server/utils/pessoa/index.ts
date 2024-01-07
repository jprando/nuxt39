import type { H3Event } from "h3";
import type { Pessoa } from "~/server/tipo";
import { pessoaPorId } from "~/server/sql";

export async function obterPessoaPorId(event: H3Event, id: number) {
  const obterPessoa = executarConsulta<Pessoa>(event, pessoaPorId, { id });
  const { rows } = await obterPessoa;
  const [pessoa] = rows;
  return pessoa;
}
