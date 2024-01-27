import { SafeParseError, ZodEffects, ZodObject, ZodRawShape } from "zod";

export async function obterViewModel<T extends ZodRawShape>(
  dados: unknown,
  validarViewModel: ZodObject<T> | ZodEffects<ZodObject<T>>,
  erroViewModel:
    | string
    | (<T>(
        viewModel: SafeParseError<T>,
      ) => (typeof createError.prototype)["input"]),
) {
  const viewModel = validarViewModel.safeParse(dados);

  if (!viewModel.success) {
    if (typeof erroViewModel === "string") {
      throw createError(erroViewModel);
    }
    throw createError(erroViewModel(viewModel));
  }

  return viewModel.data;
}
