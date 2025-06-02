BEGIN;

-- PRODUTOR 1
WITH p1 AS (
  INSERT INTO "Produtor" ("id", "cpf_cnpj", "nome")
  VALUES (uuid_generate_v4(), '123.456.789-09', 'João da Silva')
  RETURNING "id"
),
f1 AS (
  INSERT INTO "Fazenda" (
    "id", "produtor_id", "nome", "cidade", "estado",
    "area_total", "area_agricultavel", "area_vegetacao"
  ) VALUES (
    uuid_generate_v4(), (SELECT "id" FROM p1),
    'Fazenda Horizonte', 'Uberlândia', 'MG', 120, 90, 30
  ) RETURNING "id"
)
INSERT INTO "Safra" (
  "id", "fazenda_id", "ano", "cultura", "area"
) VALUES
(uuid_generate_v4(), (SELECT "id" FROM f1), 2020, 'Soja', 40),
(uuid_generate_v4(), (SELECT "id" FROM f1), 2021, 'Milho', 50);

-- PRODUTOR 2
WITH p2 AS (
  INSERT INTO "Produtor" ("id", "cpf_cnpj", "nome")
  VALUES (uuid_generate_v4(), '12.345.678/0001-99', 'Maria Oliveira')
  RETURNING "id"
),
f2 AS (
  INSERT INTO "Fazenda" (
    "id", "produtor_id", "nome", "cidade", "estado",
    "area_total", "area_agricultavel", "area_vegetacao"
  ) VALUES (
    uuid_generate_v4(), (SELECT "id" FROM p2),
    'Sítio São José', 'Londrina', 'PR', 80, 60, 20
  ) RETURNING "id"
)
INSERT INTO "Safra" (
  "id", "fazenda_id", "ano", "cultura", "area"
) VALUES
(uuid_generate_v4(), (SELECT "id" FROM f2), 2022, 'Café', 30),
(uuid_generate_v4(), (SELECT "id" FROM f2), 2023, 'Feijão', 25);

-- PRODUTOR 3
WITH p3 AS (
  INSERT INTO "Produtor" ("id", "cpf_cnpj", "nome")
  VALUES (uuid_generate_v4(), '987.654.321-00', 'Carlos Mendes')
  RETURNING "id"
),
f3a AS (
  INSERT INTO "Fazenda" (
    "id", "produtor_id", "nome", "cidade", "estado",
    "area_total", "area_agricultavel", "area_vegetacao"
  ) VALUES (
    uuid_generate_v4(), (SELECT "id" FROM p3),
    'Estância Bela Vista', 'Campo Grande', 'MS', 200, 150, 50
  ) RETURNING "id"
),
f3b AS (
  INSERT INTO "Fazenda" (
    "id", "produtor_id", "nome", "cidade", "estado",
    "area_total", "area_agricultavel", "area_vegetacao"
  ) VALUES (
    uuid_generate_v4(), (SELECT "id" FROM p3),
    'Fazenda Bom Jesus', 'Aquidauana', 'MS', 100, 80, 20
  ) RETURNING "id"
)
INSERT INTO "Safra" (
  "id", "fazenda_id", "ano", "cultura", "area"
) VALUES
(uuid_generate_v4(), (SELECT "id" FROM f3a), 2021, 'Algodão', 70),
(uuid_generate_v4(), (SELECT "id" FROM f3a), 2023, 'Milho', 80),
(uuid_generate_v4(), (SELECT "id" FROM f3b), 2020, 'Soja', 60);

-- PRODUTOR 4
WITH p4 AS (
  INSERT INTO "Produtor" ("id", "cpf_cnpj", "nome")
  VALUES (uuid_generate_v4(), '01.234.567/0001-88', 'Ana Reis')
  RETURNING "id"
),
f4 AS (
  INSERT INTO "Fazenda" (
    "id", "produtor_id", "nome", "cidade", "estado",
    "area_total", "area_agricultavel", "area_vegetacao"
  ) VALUES (
    uuid_generate_v4(), (SELECT "id" FROM p4),
    'Sítio Palmeira', 'Juazeiro', 'BA', 60, 45, 15
  ) RETURNING "id"
)
INSERT INTO "Safra" (
  "id", "fazenda_id", "ano", "cultura", "area"
) VALUES
(uuid_generate_v4(), (SELECT "id" FROM f4), 2022, 'Uva', 30);

-- PRODUTOR 5
WITH p5 AS (
  INSERT INTO "Produtor" ("id", "cpf_cnpj", "nome")
  VALUES (uuid_generate_v4(), '321.654.987-01', 'Eduardo Nogueira')
  RETURNING "id"
),
f5 AS (
  INSERT INTO "Fazenda" (
    "id", "produtor_id", "nome", "cidade", "estado",
    "area_total", "area_agricultavel", "area_vegetacao"
  ) VALUES (
    uuid_generate_v4(), (SELECT "id" FROM p5),
    'Fazenda Vale Verde', 'Chapecó', 'SC', 150, 100, 50
  ) RETURNING "id"
)
INSERT INTO "Safra" (
  "id", "fazenda_id", "ano", "cultura", "area"
) VALUES
(uuid_generate_v4(), (SELECT "id" FROM f5), 2021, 'Batata', 50),
(uuid_generate_v4(), (SELECT "id" FROM f5), 2022, 'Tomate', 45);

COMMIT;
