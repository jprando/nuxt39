import {
  excluirPessoaPorId,
  excluirPessoaPorNome,
  executarConsulta,
} from "~/server/database";
import { validarParametroApiPessoasDelete } from "~/server/validation";

export default defineEventHandler(async (event) => {
  const parametro = await obterDadosRecebidos(
    event,
    validarParametroApiPessoasDelete,
  );
  try {
    const excluir =
      "id" in parametro ? excluirPessoaPorId : excluirPessoaPorNome;
    const retorno = await executarConsulta(event, excluir, parametro);
    if (!retorno.rowsAffected) {
      setResponseStatus(event, 404);
      return;
    }
    setResponseStatus(event, 204);
  } catch (erro) {
    throw criarErroApi(
      event,
      "Erro ao tentar excluir Pessoa",
      erro,
    );
  }
});
