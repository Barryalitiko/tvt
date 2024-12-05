const { PREFIX } = require("../../config");
const { InvalidParameterError } = require("../../errors/InvalidParameterError");
const { groupSettingUpdate } = require("baileys");  // Importamos desde node_modules
const validateGrupo = require("../../middlewares/validateGrupo");

module.exports = {
  name: "grupo",
  description: "Activa o desactiva la posibilidad de que los miembros envíen mensajes.",
  commands: ["grupo"],
  usage: `${PREFIX}grupo (1/0)`, // 1 para permitir, 0 para desactivar

  handle: async ({ args, sendReply, sendSuccessReact, remoteJid, client }) => {
    // Validación de argumento
    if (!args.length || !["1", "0"].includes(args[0])) {
      return sendReply("👻 Krampus.bot 👻 Usa 1 para permitir enviar mensajes a todos, 0 para desactivar.");
    }

    const groupOn = args[0] === "1";
    const groupOff = args[0] === "0";

    try {
      // Activar o desactivar la opción de enviar mensajes en el grupo
      if (groupOn) {
        await groupSettingUpdate(client, remoteJid, 'not_announce');  // Todos pueden enviar mensajes
      } else {
        await groupSettingUpdate(client, remoteJid, 'announcement');  // Solo los administradores pueden enviar mensajes
      }

      await sendSuccessReact();
      const context = groupOn ? "permitido" : "deshabilitado";
      await sendReply(`👻 Krampus.bot 👻 El permiso para que los miembros envíen mensajes ha sido ${context} con éxito en este grupo!`);

    } catch (error) {
      console.error(error);
      if (error.message.includes("insufficient")) {
        await sendReply("👻 Krampus.bot 👻 No tienes permisos suficientes para cambiar los ajustes de este grupo.");
      } else {
        await sendReply("👻 Krampus.bot 👻 Ocurrió un error al intentar cambiar los permisos.");
      }
    }
  },
};