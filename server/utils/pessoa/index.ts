import type { H3Event } from "h3";
import type { Pessoa } from "~/server/types";
import { pessoaPorId } from "~/server/sql";

export async function obterPessoaPorId(event: H3Event, id: number) {
  const obterPessoa = executarConsulta<Pessoa>(event, pessoaPorId, { id });
  const { rows } = await obterPessoa;
  const [primeiraPessoaEncontrada] = rows;
  return primeiraPessoaEncontrada;
}
