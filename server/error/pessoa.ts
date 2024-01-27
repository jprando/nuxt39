import { SafeParseError, SafeParseReturnType } from "zod";

export const pessoaNaoEncontrada = {
  statusCode: 404,
  statusMessage: "pessoa:naoencontrada",
  message: "pessoa não encontrada",
} satisfies (typeof createError.prototype)["input"];

export const naoFoiPossivelCriarNovaPessoa = {
  statusCode: 500,
  statusMessage: "pessoa:cadastro:erro",
  message: "Não foi possível criar uma nova pessoa",
} satisfies (typeof createError.prototype)["input"];

export const nomePessoaJaExiste = {
  statusCode: 409,
  statusMessage: "pessoa:nome:duplicado",
  message: "Já existe uma pessoa com o nome informado",
} satisfies (typeof createError.prototype)["input"];

export const pessoaComInformacaoInvalida = <T>(viewModel: SafeParseError<T>) =>
  ({
    statusCode: 500,
    statusMessage: "erro:api:pessoas:porid:get",
    message: "erro ao obter as informações da pessoa",
    data: viewModel.error.errors,
  }) satisfies (typeof createError.prototype)["input"];
