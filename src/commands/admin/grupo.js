const { PREFIX } = require("../../config");
const { InvalidParameterError } = require("../../errors/InvalidParameterError");
const {
  activateGroup,
  deactivateGroup,
  isActiveGroup,
  isActiveGrupoGroup
} = require("../../utils/database");
const validateGrupo = require("../../middlewares/validateGrupo");

module.exports = {
  name: "grupo",
  description: "Activa o desactiva un grupo para la funcionalidad del bot.",
  commands: ["grupo"],
  usage: `${PREFIX}grupo (1/0)`,

  handle: async ({ args, sendReply, sendSuccessReact, remoteJid }) => {
    // Pasamos el contexto del comando al middleware para validación
    await validateGrupo({ args, remoteJid }, async () => {
      // Si pasa la validación, procedemos con la lógica del comando
      const groupOn = args[0] === "1";
      const groupOff = args[0] === "0";

      // Activar o desactivar el grupo según la opción
      if (groupOn) {
        activateGroup(remoteJid);
      } else {
        deactivateGroup(remoteJid);
      }

      await sendSuccessReact();

      const context = groupOn ? "activado" : "desactivado";

      await sendReply(`👻 Krampus.bot 👻 El grupo ha sido ${context} con éxito!`);
    });
  },
};