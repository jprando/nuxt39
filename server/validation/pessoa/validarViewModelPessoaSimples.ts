import { z } from "zod";
import { alteradoEm, criadoEm, id, nome } from "./atributos";

export const validarViewModelPessoaSimples = z
  .object(
    {
      id,
      nome,
      criadoEm,
      alteradoEm,
    },
    {
      description: "Pessoa",
      invalid_type_error: "Pessoa com informações inválidas",
      required_error: "Pessoa sem informação",
    },
  )
  .refine(({ criadoEm, alteradoEm }) => criadoEm <= alteradoEm, {
    message:
      "A data da Última Alteração dever ser maior ou igual a data de Criação",
    path: ["alteradoEm", "criadoEm"],
    params: { description: "Pessoa" },
  });
