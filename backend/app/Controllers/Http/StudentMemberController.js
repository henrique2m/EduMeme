"use strict";

const Member = use("App/Models/Member");
const User = use("App/Models/User");

class StudentMemberController {
  async index({ request }) {
    try {
      const dataEmailMembers = await Member.query()
        .select("email")
        .where("classroom_id", request.classroom.id)
        .fetch();

      const emailMembers = dataEmailMembers.toJSON();
      const dataEmail = emailMembers.map((member) => member.email);

      const members = await User.query()
        .select("id", "username", "email", "avatar")
        .whereIn("email", dataEmail)
        .where("type", "student")
        .fetch();

      return members;
    } catch (error) {
      return {
        errorIndexMembers:
          "It was not possible to get the members of this classroom. Try again.",
      };
    }
  }
}

module.exports = StudentMemberController;
