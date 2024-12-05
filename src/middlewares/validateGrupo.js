const { InvalidParameterError } = require("../errors/InvalidParameterError");
const {
  isActiveGrupoGroup
} = require("../utils/database");

module.exports = async (context, next) => {
  const { args, remoteJid } = context;

  // Validación de los argumentos (debe ser '1' o '0')
  if (!args.length || !["1", "0"].includes(args[0])) {
    throw new InvalidParameterError(
      "👻 Krampus.bot 👻 Activa con 1 o 0 (conectar o desconectar)!"
    );
  }

  const groupOn = args[0] === "1";
  const groupOff = args[0] === "0";

  // Verificar si el grupo ya está activado o desactivado
  if (groupOn && isActiveGrupoGroup(remoteJid)) {
    throw new InvalidParameterError(
      "👻 Krampus.bot 👻 Los miembros ya pueden enviar mensajes en este grupo."
    );
  }

  if (groupOff && !isActiveGrupoGroup(remoteJid)) {
    throw new InvalidParameterError(
      "👻 Krampus.bot 👻 Los miembros ya no pueden enviar mensajes en este grupo."
    );
  }

  // Si pasa la validación, pasamos al siguiente middleware o al comando
  return next();
};