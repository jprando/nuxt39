export const consultarPessoaPorId = `
SELECT id, nome, criadoEm, alteradoEm
FROM pessoas
WHERE id = :id
LIMIT 1
`;

export const consultarPessoas = `
SELECT id, nome, criadoEm, alteradoEm
FROM pessoas
ORDER BY nome ASC
`;

export const consultarPessoaPorNome = `
SELECT id
FROM pessoas
WHERE nome = :nome
LIMIT 1
`;

export const inserirPessoa = `
INSERT INTO pessoas (nome)
VALUES(:nome)
`;