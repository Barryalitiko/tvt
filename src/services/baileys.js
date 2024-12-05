// services/baileys.js

const { WAConnection } = require('baileys'); // Importar Baileys correctamente
const { getBuffer, getRandomName } = require("../utils");
const fs = require("fs");
const path = require("path");
const { TEMP_DIR, ASSETS_DIR } = require("../config");

const conn = new WAConnection();  // Instancia de Baileys

// Función para obtener imagen de perfil de un usuario
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

// Función para cambiar los permisos del grupo
async function setGroupPermissions(groupId, allowMessages) {
  try {
    // Obtener los metadatos del grupo
    const groupMetadata = await conn.groupMetadata(groupId);

    // Filtrar los administradores
    const participants = groupMetadata.participants;
    const admin = participants.filter(p => p.isAdmin);  // Filtrar los administradores

    // Establecer los permisos
    const permission = allowMessages ? 'admins' : 'noone'; // Permitir solo a administradores o deshabilitar

    // Actualizar los permisos del grupo
    await conn.groupSettingUpdate(groupId, permission);
  } catch (error) {
    console.error("Error al cambiar permisos del grupo: ", error);
    throw new Error("No se pudo cambiar los permisos del grupo.");
  }
}

module.exports = {
  getProfileImageData,
  setGroupPermissions,  // Exportamos la función
};