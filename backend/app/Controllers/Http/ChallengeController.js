"use strict";

class ChallengeController {
  async index({ request }) {
    const challenges = await request.classroom.challenges().fetch();

    return challenges;
  }

  async store({ request }) {
    const {
      question,
      optionOne,
      optionTwo,
      optionThree,
      optionFour,
      correct,
    } = request.only([
      "question",
      "optionOne",
      "optionTwo",
      "optionThree",
      "optionFour",
      "correct",
    ]);

    const data = {
      question: question.trim(),
      optionOne: optionOne.trim(),
      optionTwo: optionTwo.trim(),
      optionThree: optionThree ? optionThree.trim() : undefined,
      optionFour: optionFour ? optionFour.trim() : undefined,
      correct,
    };

    const challenges = await request.classroom.challenges().create(data);

    return challenges;
  }

  async show({ params, request }) {
    const challenge = await request.classroom
      .challenges()
      .where("id", params.id)
      .first();

    return challenge;
  }

  async update({ params, request }) {
    const {
      question,
      optionOne,
      optionTwo,
      optionThree,
      optionFour,
      correct,
    } = request.only([
      "question",
      "optionOne",
      "optionTwo",
      "optionThree",
      "optionFour",
      "correct",
    ]);

    const data = {
      question: question.trim(),
      optionOne: optionOne.trim(),
      optionTwo: optionTwo.trim(),
      optionThree: optionThree ? optionThree.trim() : undefined,
      optionFour: optionFour ? optionFour.trim() : undefined,
      correct,
    };

    const challenge = await request.classroom
      .challenges()
      .where("id", params.id)
      .first();

    challenge.merge(data);

    await challenge.save();

    return challenge;
  }

  async destroy({ params, request }) {
    const challenge = await request.classroom
      .challenges()
      .where("id", params.id)
      .first();

    await challenge.delete();
  }
}

module.exports = ChallengeController;
