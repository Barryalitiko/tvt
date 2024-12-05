const { PREFIX } = require("../../config");
const { InvalidParameterError } = require("../../errors/InvalidParameterError");
const {
  activateGroup,
  deactivateGroup,
  isActiveGroup
} = require("../../utils/database");
const validateGrupoGroup = require("../../middlewares/validateGrupoGroup");

module.exports = {
  name: "grupo",
  description: "Activa o desactiva un grupo para la funcionalidad del bot.",
  commands: ["grupo"],
  usage: `${PREFIX}grupo (1/0)`,
  handle: async ({ args, sendReply, sendSuccessReact, remoteJid }) => {
    // Aplica el middleware de validación
    await validateGrupoGroup({ remoteJid }, () => {});

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
      activateGroup(remoteJid);
    } else {
      deactivateGroup(remoteJid);
    }

    await sendSuccessReact();

    const context = groupOn ? "activado" : "desactivado";

    await sendReply(`El grupo ha sido ${context}!`);
  },
};