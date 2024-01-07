import type { H3Event } from "h3";
import type { Pessoa } from "~/server/types";
import { selectPessoas, selectPessoaPorId } from "~/server/sql";

export async function obterPessoaPorId(event: H3Event, id: number) {
  const { rows: pessoas } = await executarConsulta<Pessoa>(
    event,
    selectPessoaPorId,
    { id },
  );
  const [primeiraPessoaEncontrada] = pessoas;
  return primeiraPessoaEncontrada;
}

export async function obterPessoas(event: H3Event) {
  const { rows: pessoas } = await executarConsulta<Pessoa>(
    event,
    selectPessoas,
  );
  return pessoas;
}
