import { cadastrarPessoa, validarPessoaNomeJaExiste } from "~/server/database";
import { pessoaAoCadastrar } from "~/server/error";
import {
  validarDadosNovaPessoa,
  validarViewModelPessoaSimples,
} from "~/server/validation";

const obterViewModelPessoa = (pessoa: unknown) =>
  obterViewModel(pessoa, validarViewModelPessoaSimples, pessoaAoCadastrar);

export default defineEventHandler(async (event) => {
  const { nome } = await obterDadosRecebidos(event, validarDadosNovaPessoa);
  await validarPessoaNomeJaExiste(event, nome);
  try {
    const novaPessoa = await cadastrarPessoa(event, { nome });
    const pessoa = obterViewModelPessoa(novaPessoa);
    return { pessoa };
  } catch (erro) {
    throw criarErroApi(
      "api:pessoas:post",
      "Erro ao tentar cadastrar Pessoa",
      erro,
    );
  }
});
