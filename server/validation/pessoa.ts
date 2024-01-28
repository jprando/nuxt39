import { z } from "zod";

export const validarParametroPessoaPorId = z.object({
  id: z.coerce
    .number({
      description: "Id da pessoa",
      required_error: "Id da pessoa é obrigatório",
      invalid_type_error: "Id da pessoa deve ser um número",
    })
    .int("Id da pessoa deve ser um número inteiro")
    .positive("Id da pessoa deve ser um número positivo")
    .safe("Id da pessoa deve ser um número válido"),
});

export const validarDadosNovaPessoa = z.object(
  {
    nome: z
      .string({
        description: "Nome da pessoa",
        required_error: "Nome da pessoa é obrigatório",
        invalid_type_error: "Nome da pessoa deve ser um texto",
      })
      .min(3, "Nome da pessoa tem que ter no mínimo 3 letras")
      .toUpperCase()
      .trim(),
  },
  {
    description: "Dados da Nova Pessoa",
    invalid_type_error: "As informações da Nova Pessoa deve ser um objeto",
    required_error: "Informe os dados da Nova Pessoa",
  },
);

export const validarViewModelPessoaPorId = z
  .object({
    id: validarParametroPessoaPorId.shape.id,
    nome: validarDadosNovaPessoa.shape.nome,
    //
    criadoEm: z.coerce
      .date({
        description: "Data da criação da Pessoa",
        required_error: "Data da criação é obrigatório",
        invalid_type_error: "Data da criação deve ser uma data",
      })
      .max(new Date(), { message: "Data da criação não deve estar no futuro" }),
    //
    alteradoEm: z.coerce
      .date({
        description: "Data da última alteração da Pessoa",
        required_error: "Data da última alteração é obrigatório",
        invalid_type_error: "Data da última alteração deve ser uma data",
      })
      .max(new Date(), {
        message: "Data da última alteração não deve estar no futuro",
      }),
  }, {
    description: "Pessoa",
    invalid_type_error: "Pessoa deve ser um objeto",
    required_error: "Pessoa sem informação"
  })
  .refine(({ criadoEm, alteradoEm }) => criadoEm <= alteradoEm, {
    message:
      "A data da Última Alteração não dever ser menor que a data da Criação",
    path: ["alteradoEm"],
  });
