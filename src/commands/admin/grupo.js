const { PREFIX } = require("../../config");
const { InvalidParameterError } = require("../../errors/InvalidParameterError");
const {
  openGroup,
  closeGroup
} = require("../../utils/database");

module.exports = {
  name: "grupo",
  description: "Abre o cierra el grupo.",
  commands: ["grupo"],
  usage: `${PREFIX}grupo (0/1)`,
  handle: async ({ args, sendReply, sendSuccessReact, remoteJid }) => {
    if (!args.length || (args[0] !== "0" && args[0] !== "1")) {
      throw new InvalidParameterError(
        "👻 Krampus.bot 👻 Usa '0' para abrir el grupo o '1' para cerrarlo!"
      );
    }

    // Verificamos si el usuario tiene permisos de administrador
    // Este paso solo es necesario si tu lógica requiere control sobre permisos.
    // Si ya se gestiona en otro middleware, puedes quitarlo
    const isAdmin = await checkPermission({
      type: "admin",
      socket,
      userJid,
      remoteJid
    });

    if (!isAdmin) {
      throw new Error("No tienes permisos para realizar esta acción.");
    }

    const groupAction = args[0] === "1" ? closeGroup : openGroup;

    await groupAction(remoteJid);

    await sendSuccessReact();

    const context = args[0] === "1" ? "cerrado" : "abierto";

    await sendReply(`El grupo ha sido ${context} con éxito!`);
  }
};