// comando grupo.js

const { PREFIX } = require("../../config");
const { InvalidParameterError } = require("../../errors/InvalidParameterError");
const { setGroupPermissions } = require("../../services/baileys");
const validateGrupo = require("../../middlewares/validateGrupo");

module.exports = {
  name: "grupo",
  description: "Activa o desactiva la posibilidad de que los miembros envíen mensajes.",
  commands: ["grupo"],
  usage: `${PREFIX}grupo (1/0)`,

  handle: async ({ args, sendReply, sendSuccessReact, remoteJid }) => {
    // Pasamos el contexto del comando al middleware para validación
    await validateGrupo({ args, remoteJid }, async () => {
      // Si pasa la validación, procedemos con la lógica del comando
      const groupOn = args[0] === "1";
      const groupOff = args[0] === "0";

      // Activar o desactivar los permisos de mensajes en el grupo según la opción
      try {
        if (groupOn) {
          await setGroupPermissions(remoteJid, true);  // Permitir mensajes
        } else if (groupOff) {
          await setGroupPermissions(remoteJid, false); // Deshabilitar mensajes
        }

        await sendSuccessReact();

        const context = groupOn ? "permitido" : "deshabilitado";

        await sendReply(`👻 Krampus.bot 👻 El permiso para que los miembros envíen mensajes ha sido ${context} con éxito!`);
      } catch (error) {
        console.error("Error al cambiar los permisos del grupo: ", error);
        await sendReply("👻 Krampus.bot 👻 Hubo un error al cambiar los permisos del grupo.");
      }
    });
  },
};