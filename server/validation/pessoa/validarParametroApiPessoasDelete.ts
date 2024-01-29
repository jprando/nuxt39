import { z } from "zod";
import { id, nome } from "./atributos";

const apiPessoaDeleteId = z.object(
  { id },
  {
    description: "Pessoa para excluir",
    invalid_type_error: "Informe o Id da Pessoa para excluir",
  },
);
const apiPessoaDeleteNome = z.object(
  { nome },
  {
    description: "Pessoa para excluir",
    invalid_type_error: "Informe o Nome da Pessoa para excluir",
  },
);
export const validarParametroApiPessoasDelete = apiPessoaDeleteId
  .or(apiPessoaDeleteNome)
  .describe("Pessoa para excluir");
