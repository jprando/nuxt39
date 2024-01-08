import type { H3Event } from "h3";
import { ZodObject, ZodRawShape } from "zod";
import { obterErroParametroInvalido } from "../error";

export async function obterDadosRecebidos<T extends ZodRawShape>(
  event: H3Event,
  validarParametro: ZodObject<T>,
) {
  const body = await readValidatedBody(
    event,
    validarParametro.safeParse,
  );

  if (!body.success) {
    const parametroInvalido = obterErroParametroInvalido(body);
    throw createError(parametroInvalido);
  }

  return body.data;
}
