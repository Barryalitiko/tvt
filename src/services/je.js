const { WAConnection } = require('@adiwajshing/baileys'); // Baileys está en node_modules
const conn = new WAConnection();  // Instancia de Baileys

// Función para cambiar los permisos del grupo
async function setGroupPermissions(groupId, allowMessages) {
  try {
    // Obtener los metadatos del grupo
    const groupMetadata = await conn.groupMetadata(groupId);

    // Establecer los permisos (solo administradores o nadie)
    const permission = allowMessages ? 'admins' : 'noone';

    // Actualizar los permisos del grupo
    await conn.groupSettingUpdate(groupId, permission);
    console.log(`Permisos actualizados en el grupo ${groupId}: ${permission}`);
  } catch (error) {
    console.error("Error al cambiar permisos del grupo: ", error);
    throw new Error("No se pudo cambiar los permisos del grupo.");
  }
}

// Función para conectar Baileys (si no está ya conectado)
async function connectBaileys() {
  try {
    await conn.connect();
    console.log("Conexión establecida con WhatsApp");
  } catch (error) {
    console.error("Error al conectar con WhatsApp: ", error);
  }
}

module.exports = { setGroupPermissions, connectBaileys };