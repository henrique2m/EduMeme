"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Challenge extends Model {
  classroom() {
    return this.belongsTo("App/Models/Classroom");
  }

  responseChallenge() {
    return this.hasOne("App/Models/UserChallenge");
  }

  user() {
    return this.belongsTo("App/Models/User");
  }

  responseChallenges() {
    return this.hasMany("App/Models/UserChallenge");
  }
}

module.exports = Challenge;
