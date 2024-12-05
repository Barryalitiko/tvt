const { PREFIX } = require("../../config");
const { InvalidParameterError } = require("../../errors/InvalidParameterError");
const { openGroup, closeGroup } = require("../../utils/database");

module.exports = {
  name: "grupo",
  description: "Abre o cierra el grupo.",
  commands: ["grupo"],
  usage: `${PREFIX}grupo (0/1)`,
  handle: async ({ args, sendReply, sendSuccessReact, remoteJid, socket }) => {
    if (!args.length || (args[0] !== "0" && args[0] !== "1")) {
      throw new InvalidParameterError(
        "👻 Krampus.bot 👻 Usa '0' para abrir el grupo o '1' para cerrarlo!"
      );
    }

    // Determinamos la acción según el argumento
    const groupAction = args[0] === "1"
      ? async () => await socket.groupSettingUpdate(remoteJid, "announcement") // Cerramos el grupo
      : async () => await socket.groupSettingUpdate(remoteJid, "not_announcement"); // Abrimos el grupo

    await groupAction();

    await sendSuccessReact();

    const context = args[0] === "1" ? "cerrado" : "abierto";

    await sendReply(`El grupo ha sido ${context} con éxito!`);
  },
};
