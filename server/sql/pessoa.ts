export const obterPessoaPorId = `
SELECT id, nome, criadoEm, alteradoEm
FROM pessoas
WHERE id = :id
`;
