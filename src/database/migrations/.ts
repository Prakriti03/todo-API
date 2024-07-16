import { Knex } from 'knex';

const TABLE_NAME = 'Todos';


/**
 * Create table Todos.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.bigIncrements('id');

    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
    
    table.bigInteger("user_id").unsigned().notNullable();
    table.string('title',100).notNullable();
    table.string('completed',3).notNullable();

    table
    .foreign("user_id")
    .references("id")
    .inTable("Users")
    .onDelete("CASCADE");

  });
}

/**
 * Drop table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}