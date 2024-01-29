export type ObterCreateErrorInput<T> = T extends (input: infer U) => unknown ? U : never;
export type CreateErrorInput = ObterCreateErrorInput<typeof createError>;
