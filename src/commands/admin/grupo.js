const { activateClosedGroup, deactivateClosedGroup, isClosedGroup } = require("../../utils/database"); // Importa funciones desde el archivo database
const { InvalidParameterError } = require("../../errors/InvalidParameterError");
const { PREFIX } = require("../../config");

module.exports = {
  name: "grupo",
  description: "Abre o cierra un grupo.",
  commands: ["grupo", "configgrupo"],
  usage: `${PREFIX}grupo (0|1)`,
  middlewares: [require("../../middlewares/groupSettingsMiddleware")], // Llama al middleware
  handle: async ({ args, sendReply, sendSuccessReact, remoteJid }) => {
    if (!args.length) {
      throw new InvalidParameterError(
        "👻 𝙺𝚛𝚊𝚖𝚙𝚞𝚜.𝚋𝚘𝚝 👻 Debes especificar '0' para abrir o '1' para cerrar el grupo. Ejemplo: 'grupo 1' para cerrar el grupo."
      );
    }

    const action = args[0]; // '0' o '1'

    if (action === "1") {
      // Cerrar el grupo
      deactivateClosedGroup(remoteJid);
      await sendSuccessReact();
      await sendReply("👻 𝙺𝚛𝚊𝚖𝚙𝚞𝚜.𝚋𝚘𝚝 👻 El grupo ha sido cerrado.");
    } else if (action === "0") {
      // Abrir el grupo
      activateClosedGroup(remoteJid);
      await sendSuccessReact();
      await sendReply("👻 𝙺𝚛𝚊𝚖𝚙𝚞𝚜.𝚋𝚘𝚝 👻 El grupo ha sido abierto.");
    } else {
      throw new InvalidParameterError(
        "👻 𝙺𝚛𝚊𝚖𝚙𝚞𝚜.𝚋𝚘𝚝 👻 Opción no válida. Usa '0' para abrir o '1' para cerrar el grupo."
      );
    }
  },
};