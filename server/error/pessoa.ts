import { SafeParseError } from "zod";
import type { CreateErrorInput } from "~/server/utils/obterCreateErrorInput";

export const pessoaNaoEncontrada = {
  statusCode: 404,
  statusMessage: "erro:pessoa:naoencontrada",
  message: "Pessoa não encontrada",
} satisfies CreateErrorInput;

export const pessoaNomeJaExiste = {
  statusCode: 409,
  statusMessage: "erro:pessoa:nome:duplicado",
  message: "Já existe uma Pessoa com o nome informado",
} satisfies CreateErrorInput;

export const pessoaAoCadastrar = {
  statusCode: 500,
  statusMessage: "erro:pessoa:aocadastrar",
  message: "Não foi possível cadastrar a Pessoa",
} satisfies CreateErrorInput;

export const pessoaComInformacaoInvalida = <T>({ error }: SafeParseError<T>) =>
  ({
    statusCode: 500,
    statusMessage: "erro:pessoa:invalida",
    message: "Erro ao obter as informações da Pessoa",
    data: error.errors,
  }) satisfies CreateErrorInput;
