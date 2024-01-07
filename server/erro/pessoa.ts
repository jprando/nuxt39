export const pessoaNaoEncontrada = {
  statusCode: 404,
  statusMessage: "pessoa:naoencontrada",
  message: "pessoa não encontrada",
} satisfies (typeof createError.prototype)["input"];
