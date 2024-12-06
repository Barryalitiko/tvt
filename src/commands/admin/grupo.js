const { PREFIX } = require("../../config");
const { InvalidParameterError } = require("../../errors/InvalidParameterError");
const { setGroupPermissions } = require("../../services/baileys-management/baileys");

module.exports = {
  name: "grupo",
  description: "Activa o desactiva el envío de mensajes en el grupo",
  commands: [
    "grupo",
    "group",
  ],
  usage: `${PREFIX}grupo (1/0)`,
  handle: async ({ args, sendReply, sendSuccessReact, remoteJid }) => {
    if (!args.length) {
      throw new InvalidParameterError(
        " 👻 𝙺𝚛𝚊𝚖𝚙𝚞𝚜.𝚋𝚘𝚝 👻 𝙴𝚜𝚌𝚛𝚒𝚋𝚎 1 𝚘 0 𝚙𝚊𝚛𝚊 𝚊𝚌𝚝𝚒𝚟𝚊𝚛 𝚘 𝚍𝚎𝚜𝚊𝚌𝚝𝚒𝚟𝚊𝚛 𝚎𝚕 𝚌𝚘𝚖𝚊𝚗𝚍𝚘"
      );
    }

    const allowMessages = args[0] === "1";
    const blockMessages = args[0] === "0";

    if (!allowMessages && !blockMessages) {
      throw new InvalidParameterError(
        " 👻 𝙺𝚛𝚊𝚖𝚙𝚞𝚜.𝚋𝚘𝚝 👻 𝙴𝚜𝚌𝚛𝚒𝚋𝚎 1 𝚘 0 𝚙𝚊𝚛𝚊 𝚊𝚌𝚝𝚒𝚟𝚊𝚛 𝚘 𝚍𝚎𝚜𝚊𝚌𝚝𝚒𝚟𝚊𝚛 𝚎𝚕 𝚌𝚘𝚖𝚊𝚗𝚍𝚘"
      );
    }

    if (allowMessages) {
      // Si se permite que todos los miembros envíen mensajes
      await setGroupPermissions(remoteJid, true);
    } else {
      // Si se desactiva para que solo los administradores envíen mensajes
      await setGroupPermissions(remoteJid, false);
    }

    await sendSuccessReact();

    const context = allowMessages ? "*Permitido para todos*" : "*Solo administradores*";

    await sendReply(`👻 𝙺𝚛𝚊𝚖𝚙𝚞𝚜.𝚋𝚘𝚝 👻 𝙻𝚘𝚜 𝚙𝚎𝚛𝚖𝚒𝚜𝚘𝚜 𝚍𝚎 𝚎𝚗𝚟𝚒𝚘 𝚍𝚎 𝚖𝚎𝚗𝚜𝚊𝚓𝚎𝚜 𝚎𝚗 𝚎𝚕 𝚐𝚛𝚞𝚙𝚘 𝚑𝚊𝚗 𝚜𝚒𝚍𝚘 ${context}`);
  },
};