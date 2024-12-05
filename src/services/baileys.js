const { makeWASocket, useMultiFileAuthState } = require('@adiwajshing/baileys'); // Importa correctamente Baileys
const path = require('path');

// Inicializa la autenticación
const authState = useMultiFileAuthState(path.resolve('./auth'));

// Crear la conexión con makeWASocket
const conn = makeWASocket({
  auth: authState.state
});

// Función para cambiar los permisos del grupo
async function setGroupPermissions(groupId, allowMessages) {
  try {
    // Obtener los metadatos del grupo
    const groupMetadata = await conn.groupMetadata(groupId);

    // Verificar que los participantes son administradores
    const participants = groupMetadata.participants;
    const admin = participants.filter(p => p.isAdmin);  // Filtrar los administradores

    // Establecer los permisos
    const permission = allowMessages ? 'admins' : 'noone'; // Configurar permisos para permitir solo a administradores o a todos

    // Actualizar los permisos del grupo
    await conn.groupSettingUpdate(groupId, permission);

  } catch (error) {
    console.error("Error al cambiar permisos del grupo: ", error);
    throw new Error("No se pudo cambiar los permisos del grupo.");
  }
}

module.exports = {
  setGroupPermissions,
};