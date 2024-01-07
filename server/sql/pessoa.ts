export const pessoaPorId = `
SELECT id, nome, criadoEm, alteradoEm
FROM pessoas
WHERE id = :id
`;
