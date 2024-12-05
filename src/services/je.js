// services/baileys-management/baileys.js
const { WAConnection } = require('baileys'); // Aquí importamos Baileys directamente desde node_modules

// Función para establecer permisos de grupo
async function setGroupPermissions(groupId, allowMessages) {
  const conn = new WAConnection(); // Instancia de Baileys
  
  try {
    // Iniciar sesión en Baileys (asegúrate de manejar la autenticación correctamente)
    await conn.connect();
    
    // Obtener los metadatos del grupo
    const groupMetadata = await conn.groupMetadata(groupId);

    // Filtrar los participantes administradores
    const participants = groupMetadata.participants;
    const admin = participants.filter(p => p.isAdmin); // Filtrar administradores

    // Establecer los permisos: 'admins' para administradores o 'noone' para nadie
    const permission = allowMessages ? 'admins' : 'noone';

    // Actualizar la configuración de los permisos del grupo
    await conn.groupSettingUpdate(groupId, permission);

    console.log(`Permisos del grupo ${groupId} actualizados a: ${permission}`);

  } catch (error) {
    console.error('Error al cambiar permisos del grupo:', error);
    throw new Error('No se pudieron actualizar los permisos del grupo.');
  }
}

module.exports = {
  setGroupPermissions,
};