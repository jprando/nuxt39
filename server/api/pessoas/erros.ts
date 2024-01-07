import { SafeParseError } from "zod";

const naoEncontrada = {
  statusCode: 404,
  statusMessage: "pessoa:naoencontrada",
  message: "pessoa não encontrada",
} satisfies (typeof createError.prototype)["input"];

export const erroPessoa = {
  naoEncontrada,
  parametroInvalido: (validacao: SafeParseError<{ id: number }>) => {
    const { error: erro } = validacao;
    const [primeiroErro] = erro.issues;

    return {
      statusCode: 400,
      statusMessage: "parametro:invalido",
      message: primeiroErro.message,
      data: erro.issues,
    } satisfies (typeof createError.prototype)["input"];
  },
};
