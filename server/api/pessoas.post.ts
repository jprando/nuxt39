import { Connection } from "@planetscale/database";
import type { H3Event } from "h3";
import { ok, strictEqual } from "node:assert";

type PessoaPOST = {
  nome?: string;
};

const namespace = "pessoa:inserir";

const verificarSeNomeJaExiste = `
SELECT id
FROM pessoas
WHERE nome = :nome
`;

const inserirPessoa = `
INSERT INTO pessoas (nome)
VALUES(:nome)
`;

export default defineEventHandler(async (event: H3Event) => {
  const { nome: pessoaNome } = await readBody<PessoaPOST>(event);
  const conexao: Connection = event.context.obterConexao();
  let contexto = "validacao";
  let status = 400;

  try {
    ok(pessoaNome, "pessoa:nome:obrigatorio");
    const nome = pessoaNome?.toUpperCase();

    const { size: nomeJaExiste } = await conexao.execute(
      verificarSeNomeJaExiste,
      { nome },
    );
    ok(!nomeJaExiste, "pessoa:nome:duplicado");

    contexto = "aosalvar";
    status = 500;
    const novaPessoa = await conexao.execute(inserirPessoa, { nome });
    strictEqual(novaPessoa.rowsAffected, 1, `${namespace}:erro:${contexto}`);

    return {
      id: Number(novaPessoa.insertId),
      nome,
      time: novaPessoa.time,
    };
  } catch (err) {
    if (err instanceof Error) {
      setResponseStatus(event, status);
      return {
        erro: {
          contexto: `${namespace}:${contexto}`,
          mensagem: err.message,
        },
      };
    }
  }
});