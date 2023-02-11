/* eslint-disable no-console */
const { PrismaClient } = require('@prisma/client');
const { parse } = require('csv-parse');
const fs = require('fs');
const path = require('path');

const readCsvFile = async () => {
  let records = [];
  const inputPath = path.resolve(__dirname, '../assets/czr_pokemon_db.csv');
  const parser = await fs.createReadStream(inputPath).pipe(
    parse({
      cast: (value, context) => {
        if (context.column === 'typeOne' || context.column === 'typeTwo')
          return String(value).toUpperCase() || null;

        if (context.column === 'isLegendary') return Boolean(value);
        if (context.column === 'name') return String(value);
        return parseInt(value);
      },
      columns: [
        null,
        'name',
        'typeOne',
        'typeTwo',
        'total',
        'hp',
        'attack',
        'defense',
        'spAtk',
        'spDef',
        'speed',
        'generation',
        'isLegendary',
      ],
      from: 2,
    }),
  );
  for await (const record of parser) {
    records.push(record);
  }

  return records;
};

const createPokemons = (prisma, data) => prisma.Pokemon.createMany({ data });
const createUser = prisma =>
  prisma.user.create({
    data: { email: 'user@test.com', password: 'password' },
  });

const main = async () => {
  const records = await readCsvFile();
  const prisma = new PrismaClient();

  return Promise.all([createPokemons(prisma, records), createUser(prisma)]);
};

main()
  .then(() => console.log('Successfully created records'))
  .catch(console.error);
