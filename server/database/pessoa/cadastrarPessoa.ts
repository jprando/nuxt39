import type { EventHandlerRequest, H3Event } from "h3";
import {
  executarConsulta,
  inserirPessoa,
  obterPessoaPorId,
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
  return await obterPessoaPorId(event, Number(id));
}
