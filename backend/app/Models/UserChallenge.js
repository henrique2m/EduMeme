"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class UserChallenge extends Model {
  user() {
    return this.belongsTo("App/Models/User");
  }

  classrooms() {
    return this.belongsTo("App/Models/Classroom");
  }
}

module.exports = UserChallenge;
