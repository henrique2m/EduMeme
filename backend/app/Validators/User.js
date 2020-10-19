"use strict";

class User {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      username: "required",
      email: "required|email|unique:users",
      password: "required",
      type: "required",
    };
  }
}

module.exports = User;
