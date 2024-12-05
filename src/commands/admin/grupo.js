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
    // Validar los argumentos y el grupo antes de proceder
    await validateGrupo({ args, remoteJid }, async () => {
      // Conectar a Baileys antes de ejecutar la acción
      await connectBaileys();

      // Comprobar si el argumento es 1 (activar) o 0 (desactivar)
      const groupOn = args[0] === "1";
      const groupOff = args[0] === "0";

      // Cambiar los permisos del grupo
      if (groupOn) {
        await setGroupPermissions(remoteJid, true); // Activar mensajes para todos
      } else if (groupOff) {
        await setGroupPermissions(remoteJid, false); // Desactivar mensajes para todos
      } else {
        await sendReply("Por favor, usa 1 para activar o 0 para desactivar los permisos de mensajes.");
        return;
      }

      await sendSuccessReact();
      const context = groupOn ? "permitido" : "deshabilitado";
      await sendReply(`👻 Krampus.bot 👻 El permiso para que los miembros envíen mensajes ha sido ${context} con éxito!`);
    });
  },
};