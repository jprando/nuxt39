import type { H3Event } from "h3";
import type { Pessoa } from "./tipos";

const obterPessoaPorId = `
SELECT id, nome, criadoEm, alteradoEm
FROM pessoas
WHERE id = :id
`;

export default defineEventHandler(async (event: H3Event) => {
  const { pessoaId } = await getValidatedRouterParams(event, ({ id }: any) => {
    const pessoaId = Number(id);

    if (!pessoaId || pessoaId < 0) {
      throw createError({
        message: `id informado não é válido`,
        status: 400,
        statusMessage: "pessoa:validacao:parametro:id",
        // name: "pessoa:validacao:parametro:id",
      });
    }

    return { pessoaId };
  });

  const {
    context: { executarConsulta },
  } = event;

  const obterPessoa = executarConsulta<Pessoa>(obterPessoaPorId, {
    id: pessoaId,
  });
  const { rows: pessoas } = await obterPessoa;

  if (!pessoas.length) {
    throw createError({
      message: `pessoa não encontrada`,
      status: 400,
      statusMessage: "pessoa:pesquisar:porid:naoencontrado",
      // name: "pessoa:pesquisar:porid:naoencontrado",
    });
  }

  const [pessoa] = pessoas;
  return { pessoa };
});
