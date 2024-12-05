const { isActiveGrupoGroup } = require("../../utils/database");
const { InvalidParameterError } = require("../../errors/InvalidParameterError");

module.exports = async (context, next) => {
  const { remoteJid } = context;

  // Verifica si el grupo está activo
  if (!(await isActiveGrupoGroup(remoteJid))) {
    throw new InvalidParameterError(
      "Este grupo no está habilitado para usar este comando."
    );
  }

  // Si la validación pasa, continúa con el siguiente paso
  return next();
};