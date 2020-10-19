"use strict";

class ClassroomController {
  async index({ auth }) {
    const classroom = await auth.user.classrooms().fetch();

    return classroom;
  }

  async store({ request, auth }) {
    const { name, description, avatar } = request.only([
      "name",
      "description",
      "avatar",
    ]);

    const data = {
      name: name.trim(),
      description: description.trim(),
      avatar,
    };

    const classroom = await auth.user.classrooms().create({
      ...data,
      user_id: auth.user.id,
    });

    return classroom;
  }

  async show({ params, auth }) {
    const classroom = await auth.user
      .classrooms()
      .where("classrooms.id", params.id)
      .first();

    return classroom;
  }

  async update({ params, request, auth }) {
    const { name, description, avatar } = request.only([
      "name",
      "description",
      "avatar",
    ]);

    const data = {
      name: name.trim(),
      description: description.trim(),
      avatar,
    };

    const classroom = await auth.user
      .classrooms()
      .where("classrooms.id", params.id)
      .first();

    classroom.merge(data);

    await classroom.save();

    return classroom;
  }

  async destroy({ params, auth }) {
    const classroom = await auth.user
      .classrooms()
      .where("classrooms.id", params.id)
      .first();

    await classroom.delete();
  }
}

module.exports = ClassroomController;
