import { Connection } from "@planetscale/database";
import type { H3Event } from "h3";

type Pessoa = {
  id: number;
  nome: string;
  criadoEm: Date;
  alteradoEm: Date;
};

const obterPessoaPorId = `
SELECT id, nome, criadoEm, alteradoEm
FROM pessoas
WHERE id = :id
`;

export default defineEventHandler(async (event: H3Event) => {
  if (!event.context.params?.id) {
    setResponseStatus(event, 400);
    return {
      erro: {
        contexto: "pessoa:validacao:parametro",
        mensagem: "pessoa:id:obrigatorio",
      },
    };
  }

  const conexao: Connection = event.context.obterConexao();
  const pessoaPorId = await conexao.execute<Pessoa>(obterPessoaPorId, {
    id: Number(event.context.params.id),
  });

  if (!pessoaPorId.size) {
    setResponseStatus(event, 404);
    return;
  }

  setResponseStatus(event, 200);
  const [pessoa] = pessoaPorId.rows;
  return {
    pessoa,
    tempo: pessoaPorId.time,
  };
});
