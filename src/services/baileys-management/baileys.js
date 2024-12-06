const makeWASocket = require("@whiskeysockets/baileys").default;

// Configurar y exportar la función
const sock = makeWASocket({ /* Opciones necesarias */ });

async function groupSettingUpdate(groupId, setting) {
  try {
    await sock.groupSettingUpdate(groupId, setting);
  } catch (error) {
    console.error("Error al cambiar configuración del grupo:", error);
    throw error;
  }
}

module.exports = {
  groupSettingUpdate,
};