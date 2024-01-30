import { EventHandlerRequest, H3Error, H3Event } from "h3";

export function criarErroApi(
  event: H3Event<EventHandlerRequest>,
  mensagem?: string,
  e?: unknown,
  statusCode?: number,
) {
  const erro = e instanceof Error ? e : undefined;
  const h3Erro = e instanceof H3Error ? e : undefined;
  console.error({
    erro: h3Erro?.name || erro?.name,
    contexto: `${event.method} ${event.path}`,
    statusCode: statusCode || h3Erro?.statusCode || 500,
    statusMessage: h3Erro?.statusMessage,
    mensagem,
    original: h3Erro?.message || erro?.message,
    dados: h3Erro?.data,
  });
  return createError({
    statusCode: statusCode || h3Erro?.statusCode || 500,
    statusMessage: h3Erro?.statusMessage,
    message: mensagem || h3Erro?.message || erro?.message,
    data: h3Erro?.data,
  });
}
