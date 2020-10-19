"use strict";

const Member = use("App/Models/Member");

class StudentClassroom {
  async handle({ request, response, auth }, next) {
    const idClassroom = request.header("ID_CLASSROOM");
    let dataClassroom = null;

    if (idClassroom) {
      dataClassroom = await Member.query()
        .where("email", auth.user.email)
        .andWhere("classroom_id", idClassroom)
        .with("classroom")
        .first();
    }

    if (!dataClassroom) {
      return response.status(401).send();
    }

    const classroom = dataClassroom.toJSON();

    auth.user.currentClassroom = classroom.classroom.id;
    request.classroom = classroom.classroom;
    await next();
  }
}

module.exports = StudentClassroom;
