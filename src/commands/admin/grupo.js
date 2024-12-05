const { PREFIX } = require("../../config");
const { InvalidParameterError } = require("../../errors/InvalidParameterError");
const {
  activateGroup,
  deactivateGroup,
  isActiveGroup,
  isActiveGrupoGroup
} = require("../../utils/database");
const validateGrupo = require("../../middlewares/validateGrupo");
const baileys = require('baileys');

module.exports = {
  name: "grupo",
  description: "Activa o desactiva la opción de que los miembros hablen en el grupo.",
  commands: ["grupo"],
  usage: `${PREFIX}grupo (1/0)`,

  // Manejo del comando
  handle: async ({ args, sendReply, sendSuccessReact, remoteJid }) => {
    // Llamamos al middleware para la validación
    await validateGrupo({ args, remoteJid }, async () => {
      // Validamos que se haya pasado el argumento correcto (1 o 0)
      if (!args.length) {
        throw new InvalidParameterError(
          "👻 Krampus.bot 👻 Activa con 1 o 0 (permitir o no permitir hablar)!"
        );
      }

      const groupOn = args[0] === "1";
      const groupOff = args[0] === "0";

      if (!groupOn && !groupOff) {
        throw new InvalidParameterError(
          "👻 Krampus.bot 👻 Activa con 1 o 0 (permitir o no permitir hablar)!"
        );
      }

      // Función para gestionar los permisos de los miembros del grupo
      async function manageGroupPermissions(client, groupId, action) {
        try {
          const groupMetadata = await client.groupMetadata(groupId);
          const participants = groupMetadata.participants.map(p => p.id);

          if (action === '0') {
            // Deshabilitar que los miembros puedan hablar
            await client.groupParticipantsUpdate(groupId, participants, 'remove');
          } else if (action === '1') {
            // Permitir que los miembros puedan hablar
            await client.groupParticipantsUpdate(groupId, participants, 'add');
          }
        } catch (error) {
          console.error("Error al actualizar permisos del grupo:", error);
        }
      }

      // Usamos la función para gestionar los permisos del grupo
      await manageGroupPermissions(remoteJid, groupOn ? '1' : '0');

      // Reaccionamos con éxito y enviamos la respuesta
      await sendSuccessReact();
      const context = groupOn ? "permitido" : "no permitido";
      await sendReply(`👻 Krampus.bot 👻 Los miembros pueden hablar ahora: ${context}`);
    });
  },
};