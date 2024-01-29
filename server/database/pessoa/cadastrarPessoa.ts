import type { EventHandlerRequest, H3Event } from "h3";
import {
  consultarPessoaPorId,
  executarConsulta,
  inserirPessoa,
} from "~/server/database";
import { pessoaAoCadastrar } from "~/server/error";
import type { NovaPessoa, Pessoa } from "~/server/types";

export async function cadastrarPessoa(
  event: H3Event<EventHandlerRequest>,
  { nome }: NovaPessoa,
): Promise<Pessoa> {
  const parametros = { nome };
  const novaPessoa = await executarConsulta(event, inserirPessoa, parametros);

  if (novaPessoa.rowsAffected !== 1) {
    throw createError(pessoaAoCadastrar);
  }

  const id = novaPessoa.insertId;
  const { rows } = await executarConsulta<Pessoa>(event, consultarPessoaPorId, {
    id,
  });
  const [pessoa] = rows;
  return pessoa;
}
