import type { EventHandlerRequest, H3Event } from "h3";
import { ZodObject, ZodRawShape, ZodTypeAny, ZodUnion } from "zod";
import { obterErroParametroInvalido } from "../error";

type ObterTipoValidavelZod<T> = T extends ZodRawShape
  ? ZodObject<T>
  : ZodUnion<readonly [ZodTypeAny, ...ZodTypeAny[]]>;

export async function obterDadosRecebidos<T>(
  event: H3Event<EventHandlerRequest>,
  validarParametro: ObterTipoValidavelZod<T>,
) {
  const body = await readValidatedBody(event, validarParametro.safeParse);

  if (!body.success) {
    const parametroInvalido = obterErroParametroInvalido(body);
    throw createError(parametroInvalido);
  }

  return body.data;
}
