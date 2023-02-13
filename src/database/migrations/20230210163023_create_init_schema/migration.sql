-- CreateEnum
CREATE TYPE "TYPE" AS ENUM ('GRASS', 'FIRE', 'WATER', 'BUG', 'NORMAL', 'POISON', 'ELECTRIC', 'GROUND', 'FAIRY', 'FIGHTING', 'PSYCHIC', 'ROCK', 'GHOST', 'ICE', 'DRAGON', 'DARK', 'STEEL', 'FLYING');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pokemons" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type_one" "TYPE" NOT NULL,
    "type_two" "TYPE",
    "total" INTEGER NOT NULL,
    "hp" INTEGER NOT NULL,
    "attack" INTEGER NOT NULL,
    "defense" INTEGER NOT NULL,
    "sp_atk" INTEGER NOT NULL,
    "sp_def" INTEGER NOT NULL,
    "speed" INTEGER NOT NULL,
    "generation" INTEGER NOT NULL,
    "is_legendary" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "pokemons_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "pokemons_name_key" ON "pokemons"("name");
