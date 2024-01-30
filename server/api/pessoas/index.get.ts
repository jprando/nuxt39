import { obterPessoas } from "~/server/database/pessoa";
import { pessoaComInformacaoInvalida } from "~/server/error";
import { validarViewModelPessoaSimples } from "~/server/validation";

const obterViewModelPessoa = (pessoa: unknown) =>
  obterViewModel(
    pessoa,
    validarViewModelPessoaSimples,
    pessoaComInformacaoInvalida,
  );

export default defineEventHandler(async (event) => {
  try {
    const pessoas = await obterPessoas(event);
    const viewModelPessoas = pessoas.map(obterViewModelPessoa);
    return {
      pessoas: viewModelPessoas,
    };
  } catch (erro) {
    throw criarErroApi(
      event,
      "Erro ao tentar obter listagem de Pessoas",
      erro,
    );
  }
});
