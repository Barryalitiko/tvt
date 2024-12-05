const { WAConnection, MessageType } = require('baileys'); // Mantén la importación de Baileys según tu estructura
const { getBuffer, getRandomName } = require("../utils");
const fs = require("fs");
const path = require("path");
const { TEMP_DIR, ASSETS_DIR } = require("../config");

const conn = new WAConnection();  // Mantén la instancia de Baileys original

// Función para cambiar los permisos del grupo
async function setGroupPermissions(groupId, allowMessages) {
  try {
    // Obtener los metadatos del grupo
    const groupMetadata = await conn.groupMetadata(groupId);

    // Filtrar los participantes para obtener a los administradores
    const participants = groupMetadata.participants;
    const admin = participants.filter(p => p.isAdmin);  // Filtra los administradores

    // Configura los permisos
    const permission = allowMessages ? 'admins' : 'noone'; // Configura los permisos para permitir solo a administradores o a todos

    // Actualizar los permisos del grupo
    await conn.groupSettingUpdate(groupId, permission);

    console.log(`Permiso de mensajes actualizado para el grupo: ${groupId}`);
  } catch (error) {
    console.error("Error al cambiar permisos del grupo: ", error);
    throw new Error("No se pudo cambiar los permisos del grupo.");
  }
}

// Función para obtener la imagen de perfil
exports.getProfileImageData = async (socket, userJid) => {
  let profileImage = "";
  let buffer = null;
  let success = true;

  try {
    profileImage = await socket.profilePictureUrl(userJid, "image");

    buffer = await getBuffer(profileImage);

    const tempImage = path.resolve(TEMP_DIR, getRandomName("png"));

    fs.writeFileSync(tempImage, buffer);

    profileImage = tempImage;
  } catch (error) {
    success = false;

    profileImage = path.resolve(ASSETS_DIR, "images", "default-user.png");

    buffer = fs.readFileSync(profileImage);
  }

  return { buffer, profileImage, success };
};

// Agregar más funciones si es necesario

module.exports = {
  conn,  // Exporta la conexión para usarla en otros archivos
  setGroupPermissions,  // Exporta la función para cambiar los permisos de grupo
};