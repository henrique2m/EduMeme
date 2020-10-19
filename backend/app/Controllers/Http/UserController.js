"use strict";
const User = use("App/Models/User");
const fetch = require("node-fetch");

class UserController {
  async store({ request, auth }) {
    const dataUser = request.only([
      "email",
      "password",
      "username",
      "type",
      "avatar",
    ]);

    const { type, password, email } = dataUser;

    const tokenFacebook = password;

    try {
      const responseFacebook = await fetch(
        `https://graph.facebook.com/me?fields=email&access_token=${tokenFacebook}`
      );

      if (responseFacebook.status !== 200) {
        return { errorAuthFacebook: "Not authorization." };
      }
    } catch (e) {
      return {
        errorInternet:
          "Something went wrong, check your internet connection and try again.",
      };
    }

    try {
      const user = await User.findBy("email", email);

      if (user) {
        user.merge(dataUser);

        await user.save();

        const tokenEdumeme = await auth.attempt(email, tokenFacebook);

        return tokenEdumeme;
      }

      if (type !== "teacher" && type !== "student") {
        return { errorType: "Invalid user type." };
      }

      await User.create(dataUser);

      const tokenEdumeme = await auth.attempt(email, tokenFacebook);

      return tokenEdumeme;
    } catch (e) {
      return {
        errorRegister: "Unable to register, please try again.",
      };
    }
  }

  async show({ auth }) {
    try {
      const user = auth.user;

      user.password = undefined;
      return user;
    } catch (error) {
      return {
        errorShowUser: "Unable to get user data, please try again.",
      };
    }
  }
}

module.exports = UserController;
