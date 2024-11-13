const { PREFIX } = require("../../config");
const { InvalidParameterError } = require("../../errors/InvalidParameterError");
const {
  activateWelcomeGroup,
  deactivateWelcomeGroup,
} = require("../../utils/database");

module.exports = {
  name: "welcome",
  description: "Activa o desactiva la bienvenida",
  commands: [
    "welcome",
    "bienvenida",
  ],
  usage: `${PREFIX}welcome (s/n)`,
  handle: async ({ args, sendReply, sendSuccessReact, remoteJid }) => {
    if (!args.length) {
      throw new InvalidParameterError(
        " `👻 𝙺𝚛𝚊𝚖𝚙𝚞𝚜.𝚋𝚘𝚝 👻`
𝙴𝚜𝚌𝚛𝚒𝚋𝚎 *𝚜* 𝚘 *𝚗* 𝚙𝚊𝚛𝚊 𝚊𝚌𝚝𝚒𝚟𝚊𝚛 𝚘 𝚍𝚎𝚜𝚊𝚌𝚝𝚒𝚟𝚊𝚛 𝚎𝚕 𝚌𝚘𝚖𝚊𝚗𝚍𝚘"
      );
    }

    const welcome = args[0] === "s";
    const notWelcome = args[0] === "n";

    if (!welcome && !notWelcome) {
      throw new InvalidParameterError(
        " `👻 𝙺𝚛𝚊𝚖𝚙𝚞𝚜.𝚋𝚘𝚝 👻`
𝙴𝚜𝚌𝚛𝚒𝚋𝚎 *𝚜* 𝚘 *𝚗* 𝚙𝚊𝚛𝚊 𝚊𝚌𝚝𝚒𝚟𝚊𝚛 𝚘 𝚍𝚎𝚜𝚊𝚌𝚝𝚒𝚟𝚊𝚛 𝚎𝚕 𝚌𝚘𝚖𝚊𝚗𝚍𝚘"
      );
    }

    if (welcome) {
      activateWelcomeGroup(remoteJid);
    } else {
      deactivateWelcomeGroup(remoteJid);
    }

    await sendSuccessReact();

    const context = welcome ? "*Activada*" : "*Apagada";

    await sendReply( `👻 𝙺𝚛𝚊𝚖𝚙𝚞𝚜.𝚋𝚘𝚝` 👻
𝙻𝚊 𝙱𝚒𝚎𝚗𝚟𝚎𝚗𝚒𝚍𝚊 𝚑𝚊 𝚜𝚒𝚍𝚘 ${context});
  },
};
