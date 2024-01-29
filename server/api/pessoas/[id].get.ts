import { obterPessoaPorId } from "~/server/database";
import {
  pessoaComInformacaoInvalida,
  pessoaNaoEncontrada,
} from "~/server/error";
import {
  validarParametroPessoaPorId,
  validarViewModelPessoaSimples,
} from "~/server/validation";

export default defineEventHandler(async (event) => {
  const { id } = await obterParametro(event, validarParametroPessoaPorId);
  const pessoa = await obterPessoaPorId(event, id);

  if (pessoa?.id !== id) {
    throw createError(pessoaNaoEncontrada);
  }

  return {
    pessoa: await obterViewModel(
      pessoa,
      validarViewModelPessoaSimples,
      pessoaComInformacaoInvalida,
    ),
  };
});
