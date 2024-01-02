import { Connection } from "@planetscale/database";
import type { H3Event } from "h3";

type Pessoa = {
  id: number,
  nome: string,
}

const obterPessoas = `
SELECT id, nome, criadoEm, alteradoEm
FROM pessoas
ORDER BY LOWER(nome) ASC
`;

export default defineEventHandler(async (event: H3Event) => {
  const conexao: Connection = event.context.obterConexao();
  const pessoas = await conexao.execute<Pessoa>(obterPessoas);

  return {
    quantidade: pessoas.size,
    pessoas: pessoas.rows,
    campos: pessoas.headers,
    tempo: pessoas.time,
  };
});
