const { PREFIX } = require("../../config");
const { InvalidParameterError } = require("../../errors/InvalidParameterError");
const { activateAntiFloodGroup, deactivateAntiFloodGroup } = require("../../utils/database");

module.exports = {
  name: "antiflood",
  description: "Activa/desactiva el recurso de anti-flood en el grupo.",
  commands: ["antiflood"],
  usage: `${PREFIX}antiflood (1/0)`,
  handle: async ({ args, sendReply, sendSuccessReact, remoteJid }) => {
    if (!args.length) {
      throw new InvalidParameterError(
        " Activa con 1 o 0 (conectar o desconectar)!"
      );
    }

    const antiFloodOn = args[0] === "1";
    const antiFloodOff = args[0] === "0";

    if (!antiFloodOn && !antiFloodOff) {
      throw new InvalidParameterError(
        " Activa con 1 o 0 (conectar o desconectar)!"
      );
    }

    if (antiFloodOn) {
      activateAntiFloodGroup(remoteJid);
    } else {
      deactivateAntiFloodGroup(remoteJid);
    }

    await sendSuccessReact();
    const context = antiFloodOn ? "activado" : "desactivado";
    await sendReply(`El anti-flood ha sido ${context}!`);
  },
};
