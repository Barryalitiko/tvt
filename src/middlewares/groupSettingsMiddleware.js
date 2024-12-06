const { InvalidParameterError } = require("../errors/InvalidParameterError");
const { isActiveGrupoGroup } = require("../utils/database");

module.exports = async (context, next) => {
  const { args, remoteJid } = context;

  // Validación de los argumentos (debe ser '1' o '0')
  if (!args.length || !["1", "0"].includes(args[0])) {
    throw new InvalidParameterError(
      "👻 Krampus.bot 👻 Debes escribir 1 para abrir el grupo o 0 para cerrarlo."
    );
  }

  const groupOn = args[0] === "1";
  const groupOff = args[0] === "0";

  // Verificar si el grupo ya está activado o desactivado
  if (groupOn && isActiveGrupoGroup(remoteJid)) {
    throw new InvalidParameterError(
      "👻 Krampus.bot 👻 El grupo ya está abierto, los miembros pueden enviar mensajes."
    );
  }

  if (groupOff && !isActiveGrupoGroup(remoteJid)) {
    throw new InvalidParameterError(
      "👻 Krampus.bot 👻 El grupo ya está cerrado, los miembros no pueden enviar mensajes."
    );
  }

  // Si pasa la validación, pasa al siguiente middleware o al comando
  return next();
};