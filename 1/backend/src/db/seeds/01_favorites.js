exports.seed = async function (knex) {
  await knex.raw('TRUNCATE TABLE favorites RESTART IDENTITY CASCADE');
  await knex('favorites').insert([
    {
      id: 1,
      title: 'rowValue1',
      main_character: 'name1',
      year_released: 'year1',
    },
    {
      id: 2,
      title: 'rowValue2',
      main_character: 'name2',
      year_released: 'year2',
    },
    {
      id: 3,
      title: 'rowValue3',
      main_character: 'name3',
      year_released: 'year3',
    },
  ]);
};
