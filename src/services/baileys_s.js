const { getBuffer, getRandomName } = require("../utils");
const fs = require("fs");
const path = require("path");
const { TEMP_DIR, ASSETS_DIR } = require("../config");

exports.updateGroupSettings = async (socket, remoteJid, setting) => {
  try {
    // Validar parámetros
    if (!remoteJid || typeof remoteJid !== "string") {
      throw new Error("El remoteJid proporcionado no es válido.");
    }
    if (!["announce", "not_announce", "restrict", "unrestrict"].includes(setting)) {
      throw new Error("La configuración proporcionada no es válida.");
    }

    // Actualiza la configuración del grupo
    await socket.groupSettingUpdate(remoteJid, setting);
    return { success: true };
  } catch (error) {
    console.error("Error al actualizar la configuración del grupo:", error);
    return { 
      success: false, 
      error: {
        message: error.message,
        stack: error.stack,
      },
    };
  }
};
