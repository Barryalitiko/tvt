const { InvalidParameterError } = require("../errors/InvalidParameterError");
const {
  isActiveGrupoGroup
} = require("../utils/database");

module.exports = async (context, next) => {
  const { args, remoteJid } = context;

  // Si no se pasó el argumento, o el valor es incorrecto
  if (!args.length || !["1", "0"].includes(args[0])) {
    throw new InvalidParameterError(
      "👻 Krampus.bot 👻 Activa con 1 o 0 (conectar o desconectar)!"
    );
  }

  const groupOn = args[0] === "1";
  const groupOff = args[0] === "0";

  // Si se intenta activar un grupo que ya está activado
  if (groupOn && isActiveGrupoGroup(remoteJid)) {
    throw new InvalidParameterError(
      "👻 Krampus.bot 👻 El grupo ya está activado para el comando 'grupo'."
    );
  }

  // Si se intenta desactivar un grupo que ya está desactivado
  if (groupOff && !isActiveGrupoGroup(remoteJid)) {
    throw new InvalidParameterError(
      "👻 Krampus.bot 👻 El grupo ya está desactivado para el comando 'grupo'."
    );
  }

  // Llamamos al siguiente middleware o al comando
  return next();
};