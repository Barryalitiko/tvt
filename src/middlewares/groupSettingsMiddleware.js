const { InvalidParameterError } = require("../../errors/InvalidParameterError")
const { isClosedGroup } = require("../../utils/database"); // Usamos la función isClosedGroup

module.exports = async (context, next) => {
  const { remoteJid } = context; // El ID del grupo

  // Verificar si el grupo está cerrado
  if (isClosedGroup(remoteJid)) {
    throw new InvalidParameterError(
      "👻 𝙺𝚛𝚊𝚖𝚙𝚞𝚜.𝚋𝚘𝚝 👻 Este grupo está cerrado, no se pueden realizar cambios."
    );
  }

  // Si el grupo no está cerrado, continuar con el siguiente middleware o el comando
  return next();
};
