const { PREFIX } = require("../../config");
const { InvalidParameterError } = require("../../errors/InvalidParameterError");
const { 
  setGroupMessagePermission, 
  isActiveGrupoGroup 
} = require("../../utils/database");
const validateGrupo = require("../../middlewares/validateGrupo");

module.exports = {
  name: "grupo",
  description: "Activa o desactiva la capacidad de los miembros para enviar mensajes en el grupo.",
  commands: ["grupo"],
  usage: `${PREFIX}grupo (1/0)`,

  handle: async ({ args, sendReply, sendSuccessReact, remoteJid }) => {
    // Validación de los parámetros
    await validateGrupo({ args, remoteJid }, async () => {
      // Determinamos si se activa o desactiva el permiso para enviar mensajes
      const groupOn = args[0] === "1"; // Activar
      const groupOff = args[0] === "0"; // Desactivar

      // Si activamos el grupo, permitimos a los miembros enviar mensajes
      if (groupOn) {
        await setGroupMessagePermission(remoteJid, true);
      } 
      // Si desactivamos, bloqueamos la capacidad de los miembros para enviar mensajes
      else if (groupOff) {
        await setGroupMessagePermission(remoteJid, false);
      }

      await sendSuccessReact();

      const context = groupOn ? "activado" : "desactivado";

      // Responder al usuario con el estado de la acción
      await sendReply(`👻 Krampus.bot 👻 Los miembros pueden ${context} enviar mensajes en este grupo.`);
    });
  },
};