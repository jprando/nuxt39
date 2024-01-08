import type { H3Event } from "h3";
import type { Pessoa } from "~/server/types";
import {
  selectPessoas,
  selectPessoaPorId,
  selectPessoaPorNome,
  inserirPessoa,
} from "~/server/sql";

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

export async function validarPessoaComNomeDuplicado(
  event: H3Event,
  nome: string,
) {
  const { size: nomeJaExiste } = await executarConsulta(
    event,
    selectPessoaPorNome,
    { nome },
  );
  if (nomeJaExiste) {
    throw createError({
      statusCode: 409,
      statusMessage: "pessoa:nome:duplicado",
      message: "Já existe uma pessoa com o nome informado",
    });
  }
}

export async function cadastrarNovaPessoa(
  event: H3Event,
  { nome }: { nome: string },
): Promise<number> {
  const novaPessoa = await executarConsulta(event, inserirPessoa, { nome });

  if (novaPessoa.rowsAffected !== 1) {
    throw createError("Não foi possível criar uma nova pessoa");
  }

  return Number(novaPessoa.insertId);
}
