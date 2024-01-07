import type { H3Event } from "h3";
import { validarParametroPessoaPorId } from "~/server/validation";
import { pessoaNaoEncontrada } from "~/server/error";

export default defineEventHandler(async (event: H3Event) => {
  const { id } = await obterParametro(event, validarParametroPessoaPorId);
  const pessoa = await obterPessoaPorId(event, id);
  if (!pessoa) {
    throw createError(pessoaNaoEncontrada);
  }
  return { pessoa };
});
