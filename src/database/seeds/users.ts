import { Knex } from "knex";
import { permission } from "process";

const TABLE_NAME = "Users";

/**
 * Delete existing entries and seed values for table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export function seed(knex: Knex): Promise<void> {
  return knex(TABLE_NAME)
    .del()
    .then(() => {
      return knex(TABLE_NAME).insert([
        {
          id : 1,
          name: "User Seed",
          email: "user@user.com",
          password: "test1234",
        },
      ]);
    });
}
