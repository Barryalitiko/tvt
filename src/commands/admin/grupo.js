const { PREFIX } = require("../../config");
const { InvalidParameterError } = require("../../errors/InvalidParameterError");
const { setGroupPermissions } = require("../../services/bailey-management/baileys");  // Importamos la nueva lógica de Baileys
const validateGrupo = require("../../middlewares/validateGrupo");

module.exports = {
  name: "grupo",
  description: "Activa o desactiva la posibilidad de que los miembros envíen mensajes.",
  commands: ["grupo"],
  usage: `${PREFIX}grupo (1/0)`,

  handle: async ({ args, sendReply, sendSuccessReact, remoteJid }) => {
    // Validar los argumentos y el grupo antes de proceder
    await validateGrupo({ args, remoteJid }, async () => {
      // Verificar si el argumento es 1 (activar) o 0 (desactivar)
      const groupOn = args[0] === "1";
      const groupOff = args[0] === "0";

      if (groupOn) {
        // Activar los permisos de mensajes para todos los miembros
        await setGroupPermissions(remoteJid, true);
      } else if (groupOff) {
        // Desactivar los permisos de mensajes para todos los miembros
        await setGroupPermissions(remoteJid, false);
      } else {
        await sendReply("Por favor, usa 1 para activar o 0 para desactivar los permisos de mensajes.");
        return;
      }

      // Responder con un mensaje de éxito y el estado actualizado
      await sendSuccessReact();
      const context = groupOn ? "permitido" : "deshabilitado";
      await sendReply(`👻 Krampus.bot 👻 El permiso para que los miembros envíen mensajes ha sido ${context} con éxito!`);
    });
  },
};