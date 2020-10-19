"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UserClassroomSchema extends Schema {
  up() {
    this.create("user_classrooms", (table) => {
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
      table.timestamps();
    });
  }

  down() {
    this.drop("user_classrooms");
  }
}

module.exports = UserClassroomSchema;
