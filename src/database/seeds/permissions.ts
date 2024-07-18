import { Knex } from "knex";
import { permission } from "process";

const TABLE_NAME = "Permissions";

/**
 * Delete existing entries and seed values for table Permissions.
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
          id: 1,
          name: "user.get",
        },
        {
          id: 2,
          name: "user.getUserbyId",
        },
        {
          id: 3,
          name: "user.createUser",
        },
        {
          id: 4,
          name: "user.updateUser",
        },
        {
          id: 5,
          name: "user.deleteUser",
        },
        {
          id: 6,
          name: "admin",
        },
      ]);
    });
}

