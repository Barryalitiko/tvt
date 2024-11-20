const { PREFIX } = require("../../config");
const { InvalidParameterError } = require("../../errors/InvalidParameterError");
const {
  activateAntiLinkGroup,
  deactivateAntiLinkGroup,
} = require("../../utils/database");

module.exports = {
  name: "link",
  description: "Activa o desactiva los links",
  commands: ["nolink"],
  usage: `${PREFIX}link (s/n)`,
  handle: async ({ args, sendReply, sendSuccessReact, remoteJid }) => {
    if (!args.length) {
      throw new InvalidParameterError(
        "👻 𝙺𝚛𝚊𝚖𝚙𝚞𝚜B𝚘𝚝 👻 𝙰𝚗̃𝚊𝚍𝚎 𝚓𝚞𝚗𝚝𝚘 𝚊𝚕 𝚌𝚘𝚖𝚊𝚗𝚍𝚘 𝚕𝚒𝚗𝚔 1 𝚙𝚊𝚛𝚊 𝚎𝚗𝚌𝚎𝚗𝚍𝚎r o 0 𝚙𝚊𝚛𝚊 𝚊𝚙𝚊𝚐𝚊𝚛.
"
      );
    }

    const antiLinkOn = args[0] === "1";
    const antiLinkOff = args[0] === "0";

    if (!antiLinkOn && !antiLinkOff) {
      throw new InvalidParameterError(
        "👻 𝙺𝚛𝚊𝚖𝚙𝚞𝚜B𝚘𝚝 👻 𝙰𝚗̃𝚊𝚍𝚎 𝚓𝚞𝚗𝚝𝚘 𝚊𝚕 𝚌𝚘𝚖𝚊𝚗𝚍𝚘 𝚕𝚒𝚗𝚔 1 𝚙𝚊𝚛𝚊 𝚎𝚗𝚌𝚎𝚗𝚍𝚎𝚛 𝚘 0 𝚙𝚊𝚛𝚊 𝚊𝚙𝚊𝚐𝚊𝚛."
      );
    }

    if (antiLinkOn) {
      activateAntiLinkGroup(remoteJid);
    } else {
      deactivateAntiLinkGroup(remoteJid);
    }

    await sendSuccessReact();

    const context = antiLinkOn ? "👻 𝙰𝚌𝚝𝚒𝚟𝚊𝚍𝚘s" : "👻 𝙳𝚎𝚜𝚊𝚌𝚝𝚒𝚟𝚊𝚍𝚘s";

    await sendReply(`Los links se encuentran ${context}`);
  },
};
