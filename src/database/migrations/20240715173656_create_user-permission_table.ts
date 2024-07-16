import { Knex } from "knex";

const TABLE_NAME = "User-Permission";

/**
 * Create table User-Permission.
 *
 * @param   {Knex} knex
 * @returns {Promise}   
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.bigIncrements("id");
    table.bigInteger("user_id").unsigned().notNullable();
    table.bigInteger("permission_id").unsigned().notNullable();

    table
      .foreign("user_id")
      .references("id")
      .inTable("Users")
      .onDelete("CASCADE");
    table
      .foreign("permission_id")
      .references("id")
      .inTable("Permissions")
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
