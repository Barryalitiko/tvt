const { PREFIX } = require("../../config");
const { InvalidParameterError } = require("../../errors/InvalidParameterError");
const {
  activateGroupMessages,
  deactivateGroupMessages,
  isGroupMessagesActive
} = require("../../utils/database");
const { setGroupPermissions } = require("../../utils/baileys"); // Función para manipular los permisos de grupo con Baileys.
const validateGrupo = require("../../middlewares/validateGrupo");

module.exports = {
  name: "grupo",
  description: "Activa o desactiva la posibilidad de que los miembros envíen mensajes.",
  commands: ["grupo"],
  usage: `${PREFIX}grupo (1/0)`,

  handle: async ({ args, sendReply, sendSuccessReact, remoteJid, isAdmin, groupMetadata }) => {
    // Pasamos el contexto del comando al middleware para validación
    await validateGrupo({ args, remoteJid }, async () => {
      // Si pasa la validación, procedemos con la lógica del comando
      const groupOn = args[0] === "1";
      const groupOff = args[0] === "0";

      // Verificar que el bot sea administrador
      if (!isAdmin) {
        return sendReply("👻 Krampus.bot 👻 El bot debe ser administrador para cambiar los permisos.");
      }

      try {
        // Activar o desactivar el permiso de mensajes en el grupo según la opción
        if (groupOn) {
          // Aquí se usa Baileys para habilitar los permisos
          await setGroupPermissions(remoteJid, true);  // 'true' significa permitir que los miembros envíen mensajes
        } else {
          // Y aquí para deshabilitarlos
          await setGroupPermissions(remoteJid, false); // 'false' significa desactivar la opción
        }

        // Responder con una confirmación de éxito
        await sendSuccessReact();
        const context = groupOn ? "permitido" : "deshabilitado";
        await sendReply(`👻 Krampus.bot 👻 El permiso para que los miembros envíen mensajes ha sido ${context} con éxito!`);

      } catch (error) {
        console.error(error);
        return sendReply("👻 Krampus.bot 👻 Hubo un error al intentar cambiar los permisos del grupo.");
      }
    });
  },
};