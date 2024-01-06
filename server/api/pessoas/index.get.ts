import type { H3Event } from "h3";
import type { Pessoa } from "./tipos";

const obterPessoas = `
SELECT id, nome, criadoEm, alteradoEm
FROM pessoas
ORDER BY nome ASC
`;

export default defineEventHandler(async (event: H3Event) => {
  const {
    context: { executarConsulta },
  } = event;

  const {
    size: quantidade,
    rows: pessoas,
    time: tempo,
  } = await executarConsulta<Pessoa>(obterPessoas);

  setResponseStatus(event, 200);
  return { quantidade, pessoas, tempo };
});
