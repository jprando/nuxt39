export const selectPessoaPorId = `
SELECT id, nome, criadoEm, alteradoEm
FROM pessoas
WHERE id = :id
`;

export const selectPessoas = `
SELECT id, nome, criadoEm, alteradoEm
FROM pessoas
ORDER BY nome ASC
`;
