import type { H3Event } from "h3";
import type { Pessoa } from "./tipos";
import { z } from "zod";

const obterPessoaPorId = `
SELECT id, nome, criadoEm, alteradoEm
FROM pessoas
WHERE id = :id
`;

const inputSchema = z.object({
  id: z.coerce
    .number({
      required_error: "Id é obrigatório",
      invalid_type_error: "Id deve ser um número",
    })
    .int("Id deve ser um número inteiro")
    .positive("Id deve ser um número positivo")
    .safe("Id deve ser um número válido"),
});

export default defineEventHandler(async (event: H3Event) => {
  console.log("#23", event.context.params);
  const parametroEntrada = await getValidatedRouterParams(
    event,
    inputSchema.safeParse,
  );

  if (!parametroEntrada.success) {
    const { error } = parametroEntrada;
    const [primeiroErro] = error.issues;
    throw createError({
      statusCode: 400,
      statusMessage: "parametro:invalido",
      message: primeiroErro.message,
      name: error.name,
      data: error.issues,
    });
  }
  const { executarConsulta } = event.context;
  const { rows: pessoas } = await executarConsulta<Pessoa>(obterPessoaPorId, {
    id: parametroEntrada.data.id,
  });

  if (!pessoas.length) {
    throw createError({
      statusCode: 404,
      statusMessage: "pessoa:naoencontrada",
      message: `pessoa não encontrada`,
    });
  }

  const [pessoa] = pessoas;
  return { pessoa };
});
