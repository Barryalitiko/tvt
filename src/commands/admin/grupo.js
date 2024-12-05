const { PREFIX } = require("../../config");
const { InvalidParameterError } = require("../../errors/InvalidParameterError");
const {
  activateGrupoGroup,    // Cambiado de activateGroup
  deactivateGrupoGroup,  // Cambiado de deactivateGroup
  isActiveGrupoGroup     // Cambiado de isActiveGroup
} = require("../../utils/database");

module.exports = {
  name: "grupo",
  description: "Activa o desactiva un grupo para la funcionalidad del bot.",
  commands: ["grupo"],
  usage: `${PREFIX}grupo (1/0)`,
  handle: async ({ args, sendReply, sendSuccessReact, remoteJid }) => {
    if (!args.length) {
      throw new InvalidParameterError(
        "👻 Krampus.bot 👻 Activa con 1 o 0 (conectar o desconectar)!"
      );
    }

    const groupOn = args[0] === "1";
    const groupOff = args[0] === "0";

    if (!groupOn && !groupOff) {
      throw new InvalidParameterError(
        "👻Krampus.bot👻 Activa con 1 o 0 (conectar o desconectar)!"
      );
    }

    if (groupOn) {
      activateGrupoGroup(remoteJid);  // Cambiado aquí
    } else {
      deactivateGrupoGroup(remoteJid);  // Cambiado aquí
    }

    await sendSuccessReact();

    const context = groupOn ? "activado" : "desactivado";

    await sendReply(`El grupo ha sido ${context}!`);
  },
};