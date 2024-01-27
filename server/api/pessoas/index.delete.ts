import { Connection } from "@planetscale/database";
import type { H3Event } from "h3";
import { excluirPessoaPorId, excluirPessoaPorNome } from "~/server/database";

type PessoaPOST = {
  id?: number;
  nome?: string;
};

const namespace = "pessoa:excluir";

export default defineEventHandler(async (event: H3Event) => {
  const { id, nome } = await readBody<PessoaPOST>(event);
  const conexao: Connection = event.context.obterConexao();
  let contexto = "validacao";

  try {
    // TODO refatorar
    if (!id && !nome) {
      setResponseStatus(event, 400);
      throw new Error("pessoa:id:ou:nome:obrigatorio");
    }

    contexto = "aoexcluir";
    setResponseStatus(event, 500);
    let excluir: string;
    let parametro: object;

    if (id) {
      excluir = excluirPessoaPorId;
      parametro = { id };
    } else {
      excluir = excluirPessoaPorNome;
      parametro = { nome: nome?.toUpperCase().trim() };
    }

    const retorno = await conexao.execute(excluir, parametro);
    if (!retorno.rowsAffected) {
      setResponseStatus(event, 404);
      return;
    }

    setResponseStatus(event, 204);
  } catch (err) {
    const message =
      err instanceof Error
        ? err.message
        : "não foi possível excluir a pessao informada";
    createError({
      statusCode: 500,
      statusMessage: `${namespace}:${contexto}`,
      message: message,
    });
  }
});
