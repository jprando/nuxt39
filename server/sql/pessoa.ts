export const selectPessoaPorId = `
SELECT id, nome, criadoEm, alteradoEm
FROM pessoas
WHERE id = :id
LIMIT 1
`;

export const selectPessoas = `
SELECT id, nome, criadoEm, alteradoEm
FROM pessoas
ORDER BY nome ASC
`;

export const selectPessoaPorNome = `
SELECT id
FROM pessoas
WHERE nome = :nome
LIMIT 1
`;

export const inserirPessoa = `
INSERT INTO pessoas (nome)
VALUES(:nome)
`;