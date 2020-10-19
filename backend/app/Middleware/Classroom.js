"use strict";

class Classroom {
  async handle({ request, response, auth }, next) {
    const slug = request.header("CLASSROOM");
    let classroom = null;

    if (slug) {
      classroom = await auth.user.classrooms().where("slug", slug).first();
    }

    if (!classroom) {
      return response.status(401).send();
    }

    auth.user.currentClassroom = classroom.id;
    request.classroom = classroom;
    await next();
  }
}

module.exports = Classroom;
