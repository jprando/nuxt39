import { Connection } from "@planetscale/database";
import type { H3Event } from "h3";

type PessoaPOST = {
  nome?: string;
};

const namespace = "pessoa:inserir";

const verificarSeNomeJaExiste = `
SELECT id
FROM pessoas
WHERE nome = :nome
LIMIT 1
`;

const inserirPessoa = `
INSERT INTO pessoas (nome)
VALUES(:nome)
`;

export default defineEventHandler(async (event: H3Event) => {
  const { nome: nomePOST } = await readBody<PessoaPOST>(event);
  const conexao: Connection = event.context.obterConexao();
  let contexto = "validacao";

  try {
    if (!nomePOST) {
      setResponseStatus(event, 400);
      throw new Error("pessoa:nome:obrigatorio");
    }
    const nome = nomePOST.toUpperCase().trim();

    const { size: nomeJaExiste } = await conexao.execute(
      verificarSeNomeJaExiste,
      { nome },
    );
    if (nomeJaExiste) {
      setResponseStatus(event, 409);
      throw new Error("pessoa:nome:duplicado");
    }

    contexto = "aosalvar";
    setResponseStatus(event, 500);
    const novaPessoa = await conexao.execute(inserirPessoa, { nome });
    if (novaPessoa.rowsAffected !== 1) {
      throw new Error(`${namespace}:erro:${contexto}`);
    }

    setResponseStatus(event, 200);
    return {
      novaPessoa: { id: Number(novaPessoa.insertId), nome },
      validacao: { nomeJaExiste },
      tempo: novaPessoa.time,
    };
  } catch (err) {
    if (err instanceof Error) {
      return {
        erro: {
          contexto: `${namespace}:${contexto}`,
          mensagem: err.message,
        },
      };
    }
  } finally {
    await conexao.execute("DELETE FROM pessoas WHERE nome = 'ALBERTO' ");
    await conexao.execute("DELETE FROM pessoas WHERE nome = 'JEUDI' ");
  }
});
