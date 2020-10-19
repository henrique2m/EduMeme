"use strict";

class Classroom {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      name: "required",
    };
  }
}

module.exports = Classroom;
