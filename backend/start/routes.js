"use strict";

const Route = use("Route");
Route.post("users", "UserController.store").validator("User");
Route.post("sessions", "SessionController.store").validator("Session");

Route.group(() => {
  Route.get("users/profile", "UserController.show");
  Route.resource("student/classrooms", "StudentClassroomController").apiOnly();
  Route.resource("classrooms", "ClassroomController")
    .apiOnly()
    .validator(
      new Map([[["classrooms.store", "classrooms.update"], ["Classroom"]]])
    );
}).middleware("auth");

Route.group(() => {
  Route.get("student/members", "StudentMemberController.index");
  Route.resource("student/challenges", "StudentChallengeController").apiOnly();
  Route.post(
    "student/challenges/response",
    "StudentResponseChallengeController.store"
  );
  Route.get(
    "student/challenges/correction/:id/:alternative",
    "StudentCorrectionChallengeController.show"
  );
}).middleware("auth", "studentClassroom");

Route.group(() => {
  Route.post("members", "MemberController.store");
  Route.get("members/:add", "MemberController.index");
  Route.delete("members/:email", "MemberController.destroy");
  Route.resource("challenges", "ChallengeController")
    .apiOnly()
    .validator(
      new Map([[["challenges.store", "challenges.update"], ["Challenge"]]])
    );
}).middleware(["auth", "classroom"]);
