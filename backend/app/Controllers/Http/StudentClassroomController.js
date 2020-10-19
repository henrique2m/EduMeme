"use strict";
const Member = use("App/Models/Member");

class StudentClassroomController {
  async index({ auth }) {
    try {
      const classrooms = await Member.query()
        .where("email", auth.user.email)
        .with("classroom")
        .fetch();

      return classrooms;
    } catch (error) {
      return {
        errorStudentClassroomController:
          "Couldn't get the classrooms, try again.",
      };
    }
  }

  async show({ params, auth }) {
    try {
      const classroom = await Member.query()
        .where("email", auth.user.email)
        .andWhere("classroom_id", params.id)
        .with("classroom")
        .first();

      return classroom;
    } catch (error) {
      return {
        errorStudentClassroomController:
          "Couldn't get the classrooms, try again.",
      };
    }
  }
}

module.exports = StudentClassroomController;
