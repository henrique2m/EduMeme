"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Member extends Model {
  static boot() {
    super.boot();

    this.addHook("afterCreate", "InviteHook.newMemberClassroom");
  }

  user() {
    return this.belongsTo("App/Models/User");
  }

  classroom() {
    return this.belongsTo("App/Models/Classroom");
  }
}

module.exports = Member;
