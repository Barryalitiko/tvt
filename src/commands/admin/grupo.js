const { updateGroupSettings } = require("../../services/baileys"); // Asegúrate de que la ruta sea correcta
const { InvalidParameterError } = require("../../errors/InvalidParameterError");
const { PREFIX } = require("../../config");

module.exports = {
  name: "grupo",
  description: "Actualiza la configuración del grupo",
  commands: ["grupo", "configgrupo"],
  usage: `${PREFIX}grupo (config)`,
  handle: async ({ args, sendReply, sendSuccessReact, remoteJid }) => {
    if (!args.length) {
      throw new InvalidParameterError(
        " 👻 𝙺𝚛𝚊𝚖𝚙𝚞𝚜.𝚋𝚘𝚝 👻 𝙴𝚜𝚌𝚛𝚒𝚋𝚎 𝚎𝚕 𝚝𝚒𝚙𝚘 𝚍𝚎 𝚌𝚘𝚗𝚏𝚒𝚐𝚞𝚛𝚊𝚌𝚒𝚘𝚗 𝚚𝚞𝚎 𝚖𝚎𝚗𝚌𝚒𝚘𝚗𝚊𝚜"
      );
    }

    const setting = args[0]; // Se espera 'announcement', 'not_announcement', 'unlocked', 'locked'
    
    if (!['announcement', 'not_announcement', 'unlocked', 'locked'].includes(setting)) {
      throw new InvalidParameterError(
        " 👻 𝙺𝚛𝚊𝚖𝚙𝚞𝚜.𝚋𝚘𝚝 👻 𝙿𝚊𝚛𝚊 𝚎𝚕 𝚌𝚘𝚖𝚊𝚗𝚍𝚘 'grupo', 𝚖𝚎𝚗𝚌𝚒𝚘𝚗𝚊 𝚗𝚘𝚜𝚘𝚝𝚛𝚘𝚜 𝚐𝚛𝚞𝚙𝚘𝚜 𝚌𝚘𝚖𝚘 𝚏𝚊𝚖𝚒𝚕𝚒𝚊, 𝚎𝚓𝚎𝚖𝚙𝚕𝚘: 'announcement', 'not_announcement', 'unlocked' or 'locked'."
      );
    }

    // Llamada al servicio para actualizar la configuración
    const result = await updateGroupSettings(remoteJid, setting);

    if (result.success) {
      await sendSuccessReact();
      await sendReply(`👻 𝙺𝚛𝚊𝚖𝚙𝚞𝚜.𝚋𝚘𝚝 👻 La configuración del grupo ha sido actualizada a: ${setting}`);
    } else {
      await sendReply(`👻 𝙺𝚛𝚊𝚖𝚙𝚞𝚜.𝚋𝚘𝚝 👻 Ocurrió un error al actualizar la configuración del grupo.`);
    }
  },
};