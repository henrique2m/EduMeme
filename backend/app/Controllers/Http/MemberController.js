"use strict";

const Member = use("App/Models/Member");
const User = use("App/Models/User");

class MemberController {
  async index({ request }) {
    const { add } = request.params;
    const addBoolean = add === "true" ? true : false;
    try {
      const dataEmailMembers = await Member.query()
        .select("email")
        .where("classroom_id", request.classroom.id)
        .fetch();

      const emailMembers = dataEmailMembers.toJSON();
      const dataEmail = emailMembers.map((member) => member.email);

      if (addBoolean) {
        const membersAdd = await User.query()
          .select("id", "username", "email", "avatar")
          .whereNotIn("email", dataEmail)
          .where("type", "student")
          .fetch();
        return membersAdd;
      }

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

  async store({ request, auth }) {
    try {
      const inputMembers = request.input("members");

      const validationEmail = inputMembers.filter((email) => {
        return email !== auth.user.email;
      });

      const dataMembers = await User.query()
        .select("email")
        .whereIn("email", validationEmail)
        .where("type", "student")
        .fetch();

      const members = dataMembers.toJSON();

      if (members.length === 0 || members.length === undefined)
        return { info: "No users found." };

      const data = members.map((member) => ({
        user_id: auth.user.id,
        classroom_id: request.classroom.id,
        email: member.email,
      }));

      await Member.createMany(data);

      return;
    } catch (error) {
      return {
        errorStoreMembers:
          "It was not possible to add new members to this classroom. Try again.",
      };
    }
  }

  async destroy({ request, auth }) {
    const { email } = request.params;

    const member = await Member.query()
      .where("user_id", auth.user.id)
      .andWhere("classroom_id", request.classroom.id)
      .andWhere("email", email)
      .first();

    await member.delete();
  }
}

module.exports = MemberController;
