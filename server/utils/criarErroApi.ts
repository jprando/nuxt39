import { H3Error } from "h3";

export function criarErroApi(
  contexto: string,
  mensagem?: string,
  e?: unknown,
  statusCode = 500,
) {
  const erro = e instanceof Error ? e : undefined;
  const h3Erro = e instanceof H3Error ? e : undefined;
  console.error({
    nome: h3Erro?.name || erro?.name,
    contexto: `erro:${contexto}`,
    statusCode: statusCode || h3Erro?.statusCode,
    mensagem: mensagem || h3Erro?.message || erro?.message,
    original: h3Erro?.message || erro?.message,
  });
  return createError({
    statusCode: statusCode || h3Erro?.statusCode,
    statusMessage: `erro:${contexto}`,
    message: mensagem || h3Erro?.message || erro?.message,
    data: h3Erro?.data,
  });
}
