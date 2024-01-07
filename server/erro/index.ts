import { SafeParseError } from "zod";

export * from "./pessoa";

export function obterErroParametroInvalido<T>(
  validacao: SafeParseError<T>,
): (typeof createError.prototype)["input"] {
  const { error } = validacao;
  const { issues } = error;
  const [primeiroErro] = issues;

  return {
    statusCode: 400,
    statusMessage: "parametro:invalido",
    message: primeiroErro.message,
    data: issues,
  };
}
