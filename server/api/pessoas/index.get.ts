import type { H3Event } from "h3";
import { obterPessoas } from "~/server/utils/pessoa";

export default defineEventHandler(async (event: H3Event) => {
  const pessoas = await obterPessoas(event);
  return { pessoas };
});
