"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UserChallengeSchema extends Schema {
  up() {
    this.create("user_challenges", (table) => {
      table.increments();
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("classroom_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("classrooms")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("challenge_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("challenges")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.string("response").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("user_challenges");
  }
}

module.exports = UserChallengeSchema;
