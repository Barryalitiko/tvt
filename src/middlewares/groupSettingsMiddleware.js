const { InvalidParameterError } = require("../../errors/InvalidParameterError");
const { isGroupClosed } = require("../../utils/database");  // Asegúrate de que la ruta sea correcta

module.exports = async (context, next) => {
  const { remoteJid } = context; // El ID del grupo

  // Verificar si el grupo está cerrado
  if (isGroupClosed(remoteJid)) {
    throw new InvalidParameterError(
      "👻 Krampus.bot 👻 Este grupo está cerrado y no se pueden realizar cambios."
    );
  }

  // Si el grupo no está cerrado, continuar con el siguiente middleware o el comando
  return next();
};