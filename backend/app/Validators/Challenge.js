"use strict";

class Challenge {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      question: "required",
      optionOne: "required",
      optionTwo: "required",
    };
  }
}

module.exports = Challenge;
