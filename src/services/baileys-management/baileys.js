const { WAConnection } = require('baileys');  // El nuevo Baileys para gestionar los permisos

let conn;

// Función para establecer la conexión con el nuevo Baileys
async function getConnection() {
  if (!conn) {
    conn = new WAConnection();
    // Aquí puedes añadir la configuración y conexión, por ejemplo: conn.connect(), manejar la sesión, etc.
    await conn.connect();
  }
  return conn;
}

// Función para cambiar los permisos del grupo
async function setGroupPermissions(groupId, allowMessages) {
  try {
    const connection = await getConnection();  // Obtenemos la conexión con Baileys
    const groupMetadata = await connection.groupMetadata(groupId);  // Obtenemos los metadatos del grupo

    // Establecemos el permiso según el estado (permitido o deshabilitado)
    const permission = allowMessages ? 'admins' : 'noone';  // 'admins' permite solo a los administradores, 'noone' desactiva todos los mensajes

    // Actualizamos los permisos del grupo
    await connection.groupSettingUpdate(groupId, permission);
    console.log(`Permiso actualizado a: ${permission}`);
  } catch (error) {
    console.error("Error al cambiar permisos del grupo: ", error);
    throw new Error("No se pudo cambiar los permisos del grupo.");
  }
}

module.exports = {
  setGroupPermissions
};