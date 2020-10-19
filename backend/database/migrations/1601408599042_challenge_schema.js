"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ChallengeSchema extends Schema {
  up() {
    this.create("challenges", (table) => {
      table.increments();
      table.text("question").notNullable();
      table.text("optionOne").notNullable();
      table.text("optionTwo").notNullable();
      table.text("optionThree");
      table.text("optionFour");
      table.string("correct").notNullable();
      table
        .integer("classroom_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("classrooms")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.timestamps();
    });
  }

  down() {
    this.drop("challenges");
  }
}

module.exports = ChallengeSchema;
