exports.up = function (knex) {
  return knex.schema.createTable('pet', table => {
    table.increments();
    table.string('name').notNullable();
    table.integer('pet_type_id').notNullable();
    table.foreign('pet_type_id').references('pet_type.id');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .alterTable('pet', table => {
      table.dropForeign('pet_type_id');
    })
    .then(() => {
      return knex.schema.dropTableIfExists('pet');
    });
};
