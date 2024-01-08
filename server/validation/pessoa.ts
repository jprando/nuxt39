import { z } from "zod";

export const validarParametroPessoaPorId = z.object({
  id: z.coerce
    .number({
      description: "Id da Pessoa",
      required_error: "Id é obrigatório",
      invalid_type_error: "Id deve ser um número",
    })
    .int("Id deve ser um número inteiro")
    .positive("Id deve ser um número positivo")
    .safe("Id deve ser um número válido"),
});

export const validarDadosNovaPessoa = z.object(
  {
    nome: z
      .string({
        description: "Nome da Pessoa",
        required_error: "Nome da Pessoa é obrigatório",
        invalid_type_error: "Nome da Pessoa deve ser um texto",
      })
      .min(3, "Nome da Pessoa tem que ter no mínimo 3 letras")
      .toUpperCase()
      .trim(),
  },
  {
    description: "Dados da Nova Pessoa",
    invalid_type_error: "As informações da Nova Pessoa deve ser um objeto",
    required_error: "Informe os dados da Nova Pessoa",
  },
);
