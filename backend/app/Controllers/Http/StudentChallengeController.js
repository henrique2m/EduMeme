"use strict";
const Challenge = use("App/Models/Challenge");

class StudentChallengeController {
  async index({ request }) {
    const challenges = await Challenge.query()
      .where("classroom_id", request.classroom.id)
      .with("responseChallenge")
      .fetch();

    const dataChallenges = challenges.toJSON();

    dataChallenges.map((challenge) => {
      if (challenge.responseChallenge === null) {
        challenge.correct = undefined;
      } else {
        challenge.responseChallenge = challenge.responseChallenge.response;
      }
    });

    return dataChallenges;
  }

  async show({ params, request }) {
    const challenge = await Challenge.query()
      .where("id", params.id)
      .andWhere("classroom_id", request.classroom.id)
      .with("responseChallenge")
      .first();

    const dataChallenge = challenge.toJSON();

    if (dataChallenge.responseChallenge === null) {
      dataChallenge.correct = undefined;
    } else {
      dataChallenge.responseChallenge =
        dataChallenge.responseChallenge.response;
    }

    return dataChallenge;
  }
}

module.exports = StudentChallengeController;
