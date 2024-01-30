CREATE TABLE `pessoas` (
	`id` int NOT NULL AUTO_INCREMENT,
	`nome` text,
	`criadoEm` timestamp NULL DEFAULT current_timestamp(),
	`alteradoEm` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
	PRIMARY KEY (`id`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_0900_ai_ci;