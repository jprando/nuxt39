import type { H3Event } from "h3";
import { ZodObject, ZodRawShape } from "zod";
import { obterErroParametroInvalido } from "../error";

export async function obterParametro<T extends ZodRawShape>(
  event: H3Event,
  validarParametro: ZodObject<T>,
) {
  const parametro = await getValidatedRouterParams(
    event,
    validarParametro.safeParse,
  );

  if (!parametro.success) {
    const parametroInvalido = obterErroParametroInvalido(parametro);
    throw createError(parametroInvalido);
  }

  return parametro.data;
}
