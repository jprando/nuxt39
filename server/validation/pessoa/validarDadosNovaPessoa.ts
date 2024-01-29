import { z } from "zod";
import { nome } from "./atributos";

export const validarDadosNovaPessoa = z.object(
  {
    nome,
  },
  {
    description: "Dados da Nova Pessoa",
    invalid_type_error: "Informe corretamente os dados da Nova Pessoa",
    required_error: "Informe os dados da Nova Pessoa",
  },
);
