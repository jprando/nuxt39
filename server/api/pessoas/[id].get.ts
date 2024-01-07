import type { H3Event } from "h3";
import { obterPessoaPorId } from "~/server/sql/pessoa";
import { validarParametroPessoaPorId } from "~/server/validacao/pessoa";
import { erroPessoa } from "./erros";
import type { Pessoa } from "./tipos";


export default defineEventHandler(async (event: H3Event) => {
  const { executarConsulta } = event.context;

  const parametro = await getValidatedRouterParams(
    event,
    validarParametroPessoaPorId.safeParse,
  );
  if (!parametro.success) {
    throw createError(erroPessoa.parametroInvalido(parametro));
  }

  const { id } = parametro.data;
  const obterPessoa = executarConsulta<Pessoa>(obterPessoaPorId, { id });
  const { rows: pessoas } = await obterPessoa;

  if (!pessoas.length) {
    throw createError(erroPessoa.naoEncontrada);
  }

  const [pessoa] = pessoas;
  return { pessoa };
});
