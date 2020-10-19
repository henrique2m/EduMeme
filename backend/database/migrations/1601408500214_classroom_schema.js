"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ClassroomSchema extends Schema {
  up() {
    this.create("classrooms", (table) => {
      table.increments();
      table.string("name").notNullable();
      table.string("description");
      table.string("avatar");
      table.string("slug").notNullable().unique();
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.timestamps();
    });
  }

  down() {
    this.drop("classrooms");
  }
}

module.exports = ClassroomSchema;
