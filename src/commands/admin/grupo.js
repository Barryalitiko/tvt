const { PREFIX } = require("../../config");
const { InvalidParameterError } = require("../../errors/InvalidParameterError");
const { groupSettingUpdate } = require("../../services/baileys-management/baileys");

module.exports = {
  name: "grupo",
  description: "Activa o desactiva la posibilidad de que los miembros envíen mensajes.",
  commands: ["grupo"],
  usage: `${PREFIX}grupo (1/0)`,

  handle: async ({ args, sendReply, sendSuccessReact, remoteJid }) => {
    try {
      // Validar los argumentos
      if (!args[0] || !["1", "0"].includes(args[0])) {
        throw new InvalidParameterError(
          `Uso incorrecto del comando.\nFormato: ${PREFIX}grupo (1/0)`
        );
      }

      // Determinar la configuración basada en el argumento
      const setting = args[0] === "1" ? "not_announcement" : "announcement";

      // Cambiar los permisos del grupo usando Baileys
      await groupSettingUpdate(remoteJid, setting);

      await sendSuccessReact();
      const status = args[0] === "1" ? "permitido" : "restringido";
      await sendReply(`👻 Krampus.bot 👻 Los permisos de envío de mensajes se han ${status} con éxito.`);
    } catch (error) {
      console.error("Error en el comando grupo:", error);
      await sendReply("Ocurrió un error al procesar el comando. Verifica los permisos del bot.");
    }
  },
};