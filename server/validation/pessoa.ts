import { z } from "zod";

export const validarParametroPessoaPorId = z.object({
    id: z.coerce
      .number({
        required_error: "Id é obrigatório",
        invalid_type_error: "Id deve ser um número",
      })
      .int("Id deve ser um número inteiro")
      .positive("Id deve ser um número positivo")
      .safe("Id deve ser um número válido"),
  });
