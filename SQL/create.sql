-- DROP em ordem reversa de dependência
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'checar_area_total_safra'
  ) THEN
    EXECUTE 'DROP TRIGGER "checar_area_total_safra" ON "Safra"';
  END IF;
EXCEPTION WHEN undefined_table THEN
  -- ignora erro se a tabela "Safra" não existir ainda
  NULL;
END;
$$;


DROP FUNCTION IF EXISTS "validar_area_safra"();
DROP TABLE IF EXISTS "Safra";
DROP TABLE IF EXISTS "Fazenda";
DROP TABLE IF EXISTS "Produtor";
DROP TYPE IF EXISTS "cultura_tipo";

-- Ativa extensão de UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tipo ENUM para culturas brasileiras
CREATE TYPE "cultura_tipo" AS ENUM (
    'Soja',
    'Milho',
    'Cana-de-açúcar',
    'Café',
    'Algodão',
    'Arroz',
    'Feijão',
    'Trigo',
    'Tomate',
    'Batata',
    'Uva',
    'Laranja'
);

-- Tabela Produtor
CREATE TABLE "Produtor" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "cpf_cnpj" TEXT NOT NULL UNIQUE,
    "nome" TEXT NOT NULL,
    CHECK (
        "cpf_cnpj" ~ '^\d{3}\.\d{3}\.\d{3}\-\d{2}$' OR
        "cpf_cnpj" ~ '^\d{2}\.\d{3}\.\d{3}/\d{4}\-\d{2}$'
    )
);

-- Tabela Fazenda
CREATE TABLE "Fazenda" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "produtor_id" UUID NOT NULL REFERENCES "Produtor"("id"),
    "nome" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "area_total" REAL NOT NULL,
    "area_agricultavel" REAL NOT NULL,
    "area_vegetacao" REAL NOT NULL,
    CHECK ("area_agricultavel" + "area_vegetacao" <= "area_total")
);

-- Tabela Safra
CREATE TABLE "Safra" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "fazenda_id" UUID NOT NULL REFERENCES "Fazenda"("id"),
    "ano" INTEGER NOT NULL,
    "cultura" "cultura_tipo" NOT NULL,
    "area" REAL NOT NULL,
);

-- Função para validação da soma da área de safra por ano
CREATE OR REPLACE FUNCTION "validar_area_safra"()
RETURNS TRIGGER AS $$
DECLARE
    area_total_agricultavel REAL;
    soma_existente REAL;
BEGIN
    -- Obtem a área agricultável da fazenda
    SELECT "area_agricultavel"
    INTO area_total_agricultavel
    FROM "Fazenda"
    WHERE "id" = NEW."fazenda_id";

    -- Soma das áreas já registradas naquele ano
    SELECT COALESCE(SUM("area"), 0)
    INTO soma_existente
    FROM "Safra"
    WHERE "fazenda_id" = NEW."fazenda_id"
      AND "ano" = NEW."ano"
      AND (TG_OP = 'INSERT' OR "id" <> NEW."id");

    IF soma_existente + NEW."area" > area_total_agricultavel THEN
        RAISE EXCEPTION
        'A soma das áreas das safras no ano % (%.2f ha) excede a área agricultável da fazenda (%.2f ha)',
        NEW."ano", soma_existente + NEW."area", area_total_agricultavel;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger de validação associada à tabela Safra
CREATE TRIGGER "checar_area_total_safra"
BEFORE INSERT OR UPDATE ON "Safra"
FOR EACH ROW
EXECUTE FUNCTION "validar_area_safra"();
