exports.up = function (knex) {
  return knex.schema.createTable('favorites', table => {
    table.increments('id').notNullable().unique();
    table.string('title').notNullable().unique();
    table.string('main_character').notNullable();
    table.string('year_released').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('favorites');
};
