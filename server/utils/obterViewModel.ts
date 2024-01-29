import { SafeParseError, ZodEffects, ZodObject, ZodRawShape } from "zod";
import { CreateErrorInput } from "./obterCreateErrorInput";

export function obterViewModel<T extends ZodRawShape>(
  dados: unknown,
  validarViewModel: ZodObject<T> | ZodEffects<ZodObject<T>>,
  erroViewModel:
    | string
    | CreateErrorInput
    | (<T>(
        viewModel: SafeParseError<T>,
      ) => (typeof createError.prototype)["input"]),
) {
  const viewModel = validarViewModel.safeParse(dados);

  const validacaoDescricao = (
    validarViewModel._def as { schema?: { description?: string } }
  ).schema?.description;

  if (!viewModel.success) {
    console.error({
      erro: true,
      validacao: validacaoDescricao,
      mensagem: viewModel.error.errors.map((e) => e.message),
      dados,
    });
    if (
      typeof erroViewModel === "string" ||
      typeof erroViewModel !== "function"
    ) {
      throw createError(erroViewModel);
    }
    throw createError(erroViewModel(viewModel));
  }

  return viewModel.data;
}
