import type { H3Event } from "h3";
import { obterPessoaPorId } from "~/server/database";
import {
  pessoaComInformacaoInvalida,
  pessoaNaoEncontrada,
} from "~/server/error";
import {
  validarParametroPessoaPorId,
  validarViewModelPessoaPorId,
} from "~/server/validation";

export default defineEventHandler(async (event: H3Event) => {
  const { id } = await obterParametro(event, validarParametroPessoaPorId);
  const pessoa = await obterPessoaPorId(event, id);

  if (pessoa?.id !== id) {
    throw createError(pessoaNaoEncontrada);
  }

  const viewModel = await obterViewModel(
    pessoa,
    validarViewModelPessoaPorId,
    pessoaComInformacaoInvalida,
  );

  return {
    pessoa: viewModel,
  };
});
