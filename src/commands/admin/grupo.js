const { PREFIX } = require("../../config");
const { InvalidParameterError } = require("../../errors/InvalidParameterError");
const { isAdmin } = require("../../utils/database");  // Asumiendo que tienes una función para verificar si un usuario es admin
const { setGroupPermission } = require("../../services/baileys"); // Función de servicio para cambiar permisos de grupo

module.exports = {
  name: "grupo",
  description: "Activa o desactiva la opción de que los miembros hablen en el grupo.",
  commands: ["grupo"],
  usage: `${PREFIX}grupo (1/0)`, // 1 para permitir hablar, 0 para desactivar

  handle: async ({ args, sendReply, sendSuccessReact, remoteJid, sender }) => {
    if (!args.length) {
      throw new InvalidParameterError("👻 Krampus.bot 👻 Usa 1 para activar o 0 para desactivar!");
    }

    const allowTalking = args[0] === "1"; // Si es 1, permitir hablar; si es 0, desactivar
    const groupAdmin = await isAdmin(remoteJid, sender); // Verificamos si el usuario que ejecuta el comando es admin

    if (!groupAdmin) {
      throw new InvalidParameterError("👻 Krampus.bot 👻 Solo los administradores pueden ejecutar este comando.");
    }

    // Usamos la función setGroupPermission para cambiar los permisos en el grupo
    await setGroupPermission(remoteJid, allowTalking);

    await sendSuccessReact();
    const context = allowTalking ? "habilitado" : "deshabilitado";

    await sendReply(`👻 Krampus.bot 👻 Los miembros ahora pueden ${context} hablar en el grupo.`);
  },
};