import { z } from "zod";
import { id } from "./atributos";

export const validarParametroPessoaPorId = z.object(
  {
    id,
  },
  {
    description: "Pesquisar Pessoa por Id",
    invalid_type_error: "Informe o Id da Pessoa corretamente",
    required_error: "Informe o Id da Pessoa",
  },
);
