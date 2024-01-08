import type { H3Event } from "h3";
import { validarDadosNovaPessoa } from "~/server/validation";

export default defineEventHandler(async (event: H3Event) => {
  const { nome } = await obterDadosRecebidos(event, validarDadosNovaPessoa);

  try {
    await validarPessoaComNomeDuplicado(event, nome);
    const id = await cadastrarNovaPessoa(event, { nome });
    setResponseStatus(event, 201);
    return {
      pessoa: {
        id,
        nome,
      },
    };
  } catch (e) {
    const erro = e instanceof Error ? e : undefined;
    throw createError({
      statusMessage: "pessoa:erro:aocadastrar",
      message: erro?.message || "Erro ao tentar cadastrar Pessoa",
    });
  }
});
