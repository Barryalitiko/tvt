const { PREFIX } = require("../../config");
const { InvalidParameterError } = require("../../errors/InvalidParameterError");
const {
  activateAutoResponderGroup,
  deactivateAutoResponderGroup,
} = require("../../utils/database");

module.exports = {
  name: "auto-responder",
  description: "Activa o desactiva autoresponder",
  commands: ["auto-responder"],
  usage: `${PREFIX}auto-responder (s/n)`,
  handle: async ({ args, sendReply, sendSuccessReact, remoteJid }) => {
    if (!args.length) {
      throw new InvalidParameterError(
        "`👻 𝙺𝚛𝚊𝚖𝚙𝚞𝚜.𝚋𝚘𝚝 👻`
𝙴𝚜𝚌𝚛𝚒𝚋𝚎 *𝚜* 𝚘 *𝚗* 𝚙𝚊𝚛𝚊 𝚊𝚌𝚝𝚒𝚟𝚊𝚛 𝚘 𝚍𝚎𝚜𝚊𝚌𝚝𝚒𝚟𝚊𝚛 𝚎𝚕 𝚌𝚘𝚖𝚊𝚗𝚍𝚘"
      );
    }

    const autoResponder = args[0] === "s";
    const notAutoResponder = args[0] === "n";

    if (!autoResponder && !notAutoResponder) {
      throw new InvalidParameterError(
        "`👻 𝙺𝚛𝚊𝚖𝚙𝚞𝚜.𝚋𝚘𝚝 👻`
𝙴𝚜𝚌𝚛𝚒𝚋𝚎 *𝚜* 𝚘 *𝚗* 𝚙𝚊𝚛𝚊 𝚊𝚌𝚝𝚒𝚟𝚊𝚛 𝚘 𝚍𝚎𝚜𝚊𝚌𝚝𝚒𝚟𝚊𝚛 𝚎𝚕 𝚌𝚘𝚖𝚊𝚗𝚍𝚘"
      );
    }

    if (autoResponder) {
      activateAutoResponderGroup(remoteJid);
    } else {
      deactivateAutoResponderGroup(remoteJid);
    }

    await sendSuccessReact();

    const context = autoResponder ? "activado" : "desactivado";

    await sendReply(`𝙰𝚞𝚝𝚘-𝚛𝚎𝚜𝚙𝚘𝚗𝚍𝚎𝚛 𝚑𝚊 𝚜𝚒𝚍𝚘 ${context}`);
  },
};
