import type { H3Event } from "h3";
import {
  consultarPessoaPorId,
  consultarPessoaPorNome,
  consultarPessoas,
  executarConsulta,
  inserirPessoa,
} from "~/server/database";
import {
  naoFoiPossivelCriarNovaPessoa,
  nomePessoaJaExiste,
} from "~/server/error";
import type { NovaPessoa, Pessoa } from "~/server/types";

export async function obterPessoaPorId(event: H3Event, id: number) {
  const parametros = { id };
  const { rows } = await executarConsulta<Pessoa>(
    event,
    consultarPessoaPorId,
    parametros,
  );
  const [pessoa] = rows;
  return pessoa;
}

export async function obterPessoas(event: H3Event) {
  const { rows } = await executarConsulta<Pessoa>(event, consultarPessoas);
  return rows;
}

export async function validarNomePessoaJaExiste(event: H3Event, nome: string) {
  const parametros = { nome };
  const { size: nomeJaExiste } = await executarConsulta(
    event,
    consultarPessoaPorNome,
    parametros,
  );

  if (nomeJaExiste) {
    throw createError(nomePessoaJaExiste);
  }
}

export async function cadastrarNovaPessoa(
  event: H3Event,
  { nome }: NovaPessoa,
): Promise<number> {
  const parametros = { nome };
  const novaPessoa = await executarConsulta(event, inserirPessoa, parametros);

  if (novaPessoa.rowsAffected !== 1) {
    throw createError(naoFoiPossivelCriarNovaPessoa);
  }

  return Number(novaPessoa.insertId);
}
