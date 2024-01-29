import { z } from "zod";

export const id = z.coerce
  .number({
    description: "Id da pessoa",
    required_error: "Id da pessoa é obrigatório",
    invalid_type_error: "Id da pessoa deve ser um número",
  })
  .int("Id da pessoa deve ser um número inteiro")
  .positive("Id da pessoa deve ser um número positivo")
  .safe("Id da pessoa deve ser um número válido");
//
export const nome = z
  .string({
    description: "Nome da pessoa",
    required_error: "Nome da pessoa é obrigatório",
    invalid_type_error: "Nome da pessoa deve ser um texto",
  })
  .min(3, "Nome da pessoa tem que ter no mínimo 3 letras")
  .toUpperCase()
  .trim();
//
export const criadoEm = z
  .string({
    description: "Data da última alteração da Pessoa",
    required_error: "Data da última alteração é obrigatório",
    invalid_type_error: "Data da última alteração deve ser uma data",
  })
  .transform((valor) => new Date(`${valor} Z`))
  .pipe(
    z.date({
      description: "Data da criação da Pessoa",
      required_error: "Data da criação é obrigatório",
      invalid_type_error: "Data da criação deve ser uma data",
    }),
  )
  .refine((valorCriadoEm) => valorCriadoEm <= new Date(), {
    message: "Data da criação não deve estar no futuro",
    path: ["criadoEm"],
    params: { descriprion: "Pessoa" },
  });
//
export const alteradoEm = z
  .string({
    description: "Data da última alteração da Pessoa",
    required_error: "Data da última alteração é obrigatório",
    invalid_type_error: "Data da última alteração deve ser uma data",
  })
  .transform((valor) => new Date(`${valor} Z`))
  .pipe(
    z.date({
      description: "Data da última alteração da Pessoa",
      required_error: "Data da última alteração é obrigatório",
      invalid_type_error: "Data da última alteração deve ser uma data",
    }),
  )
  .refine((valorAlteradoEm) => valorAlteradoEm <= new Date(), {
    message: "Data da última alteração não deve estar no futuro",
    path: ["alteradoEm"],
    params: { descriprion: "Pessoa" },
  });
