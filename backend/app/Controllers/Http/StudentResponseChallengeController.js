"use strict";

class UserChallengeController {
  async store({ request, auth }) {
    const { idChallenge, response } = request.only(["idChallenge", "response"]);

    switch (response) {
      case "a":
      case "b":
      case "c":
      case "d":
        break;
      default:
        return { errorResponse: "Invalid response." };
    }

    const verifyResponse = await auth.user
      .challenges()
      .where("user_id", auth.user.id)
      .andWhere("classroom_id", request.classroom.id)
      .andWhere("challenge_id", idChallenge)
      .first();

    if (verifyResponse)
      return { erroResponse: "You already answered this challenge." };

    await auth.user.challenges().create({
      user_id: auth.user.id,
      classroom_id: request.classroom.id,
      challenge_id: idChallenge,
      response: response,
    });

    return;
  }
}

module.exports = UserChallengeController;
