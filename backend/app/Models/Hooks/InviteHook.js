"use strict";

const User = use("App/Models/User");

const InviteHook = (exports = module.exports = {});

InviteHook.newMemberClassroom = async (invite) => {
  const { email } = invite;
  const invited = await User.findBy("email", email);

  if (invited) {
    // await invited.classrooms().attach(invite.classroom_id);
    // Aqui pode ser  enviado um convite para o usuário
    // posso usar email ou websockets
    console.log(email);
  } else {
    return false;
  }
};
