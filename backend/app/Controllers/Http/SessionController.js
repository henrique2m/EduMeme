"use strict";
const User = use("App/Models/User");
const fetch = require("node-fetch");

class SessionController {
  async store({ request, auth }) {
    const data = request.all();

    const { email, password } = data;

    const user = await User.findBy("email", email);

    if (!user) {
      return { infoUser: { status: false, message: "User not registered." } };
    }

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
      user.merge(data);

      await user.save();

      const tokenEdumeme = await auth.attempt(email, tokenFacebook);

      return tokenEdumeme;
    } catch (e) {
      return {
        errorRefreshToken: "Unable to register, please try again.",
      };
    }
  }
}

module.exports = SessionController;
