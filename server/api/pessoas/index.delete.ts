import { Connection } from "@planetscale/database";
import type { H3Event } from "h3";

type PessoaPOST = {
  id?: number;
  nome?: string;
};

const namespace = "pessoa:excluir";

const excluirPessoaPorNome = `
DELETE FROM pessoas
WHERE nome = :nome
`;

const excluirPessoaPorId = `
DELETE FROM pessoas
WHERE id = :id
`;

export default defineEventHandler(async (event: H3Event) => {
  const { id: idPOST, nome: nomePOST } = await readBody<PessoaPOST>(event);
  const conexao: Connection = event.context.obterConexao();
  let contexto = "validacao";

  try {
    if (!idPOST && !nomePOST) {
      setResponseStatus(event, 400);
      throw new Error("pessoa:id:ou:nome:obrigatorio");
    }

    contexto = "aoexcluir";
    setResponseStatus(event, 500);
    let excluir: string;
    let parametro: object;

    if (idPOST) {
      excluir = excluirPessoaPorId;
      parametro = { id: idPOST };
    } else {
      excluir = excluirPessoaPorNome;
      parametro = { nome: nomePOST?.toUpperCase().trim() };
    }

    const retorno = await conexao.execute(excluir, parametro);
    if (!retorno.rowsAffected) {
      setResponseStatus(event, 404);
      return;
    }

    setResponseStatus(event, 204);
  } catch (err) {
    if (err instanceof Error) {
      return {
        erro: {
          contexto: `${namespace}:${contexto}`,
          mensagem: err.message,
        },
      };
    }
  }
});
