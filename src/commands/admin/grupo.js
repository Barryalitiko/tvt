const { updateGroupSettings } = require("../../services/baileys"); // Asegúrate de que la ruta sea correcta
const { InvalidParameterError } = require("../../errors/InvalidParameterError");
const { PREFIX } = require("../../config");

module.exports = {
  name: "grupo",
  description: "Abre o cierra el grupo para que los miembros puedan enviar mensajes.",
  commands: ["grupo", "configgrupo"],
  usage: `${PREFIX}grupo (1/0)`, // 1 para abrir, 0 para cerrar
  handle: async ({ args, sendReply, sendSuccessReact, remoteJid }) => {
    if (!args.length) {
      throw new InvalidParameterError(
        "👻 Krampus.bot 👻 Debes escribir 1 para abrir el grupo o 0 para cerrarlo."
      );
    }

    const openGroup = args[0] === "1";
    const closeGroup = args[0] === "0";

    // Verificación de parámetros válidos (1 o 0)
    if (!openGroup && !closeGroup) {
      throw new InvalidParameterError(
        "👻 Krampus.bot 👻 Solo puedes usar 1 para abrir el grupo o 0 para cerrarlo."
      );
    }

    // Actualización de la configuración del grupo (abrir o cerrar)
    try {
      const result = await updateGroupSettings(remoteJid, openGroup ? 'announcement' : 'not_announcement');

      if (result.success) {
        await sendSuccessReact();
        const action = openGroup ? "abierto" : "cerrado";
        await sendReply(`👻 Krampus.bot 👻 El grupo ha sido ${action} correctamente.`);
      } else {
        await sendReply("👻 Krampus.bot 👻 Ocurrió un error al actualizar la configuración del grupo.");
      }
    } catch (error) {
      console.error(error);
      await sendReply("👻 Krampus.bot 👻 No se pudo actualizar la configuración del grupo.");
    }
  },
};