"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class InviteSchema extends Schema {
  up() {
    this.create("members", (table) => {
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
      table.string("email").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("members");
  }
}

module.exports = InviteSchema;
