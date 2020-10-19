"use strict";
const Challenge = use("App/Models/Challenge");

class StudentResponseChallengeController {
  async show({ params, request }) {
    const { id, alternative } = params;

    try {
      const challenge = await Challenge.query()
        .where("id", id)
        .andWhere("classroom_id", request.classroom.id)
        .first();

      if (challenge.correct === alternative) {
        return { correct: true };
      }

      return { correct: false };
    } catch (error) {
      return {
        errorStudentResponse:
          "We were unable to save your response, please try again.",
      };
    }
  }
}

module.exports = StudentResponseChallengeController;
