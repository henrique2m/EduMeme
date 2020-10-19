"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Classroom extends Model {
  static boot() {
    super.boot();

    this.addTrait("@provider:Lucid/Slugify", {
      fields: {
        slug: "name",
      },
      strategy: "dbIncrement",
      disableUpdates: false,
    });
  }

  users() {
    return this.belongsToMany("App/Models/User").pivotModel(
      "App/Models/UserClassroom"
    );
  }

  challenges() {
    return this.hasMany("App/Models/Challenge");
  }

  member() {
    return this.hasMany("App/Models/Member");
  }
}

module.exports = Classroom;
