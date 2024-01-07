import type { H3Event } from "h3";
import { validarParametroPessoaPorId } from "~/server/validacao";
import { obterErroParametroInvalido, pessoaNaoEncontrada } from "~/server/erro";

async function obterParametro(event: H3Event) {
  const parametro = await getValidatedRouterParams(
    event,
    validarParametroPessoaPorId.safeParse,
  );

  if (!parametro.success) {
    const parametroInvalido = obterErroParametroInvalido(parametro);
    throw createError(parametroInvalido);
  }

  return parametro.data;
}

export default defineEventHandler(async (event: H3Event) => {
  const { id } = await obterParametro(event);
  const pessoa = await obterPessoaPorId(event, id);
  if (!pessoa) {
    throw createError(pessoaNaoEncontrada);
  }
  return { pessoa };
});
