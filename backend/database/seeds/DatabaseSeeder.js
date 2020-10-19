"use strict";

/*
|--------------------------------------------------------------------------
| DatabaseSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const User = use("App/Models/User");

class DatabaseSeeder {
  async run() {
    const user = await User.create({
      username: "",
      email: "btdavintehenrique@gmail.com",
      password: "12345678",
      type: "teacher",
      avatar: "henrique.jpg",
    });

    await user.classrooms().create({
      name: "",
      description: "",
      avatar: "",
      user_id: user.id,
    });
  }
}

module.exports = DatabaseSeeder;
