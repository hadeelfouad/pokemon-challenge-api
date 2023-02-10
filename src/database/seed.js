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

const seedDatabase = (prisma, records) =>
  prisma.Pokemon.createMany({ data: records });

const main = async () => {
  const records = await readCsvFile();
  const prisma = new PrismaClient();

  return seedDatabase(prisma, records);
};

main()
  .then(() => console.log('Successfully created records'))
  .catch(console.error);
