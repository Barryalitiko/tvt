const { getBuffer, getRandomName } = require("../utils");
const fs = require("fs");
const path = require("path");
const { TEMP_DIR, ASSETS_DIR } = require("../config");

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

exports.updateGroupSettings = async (socket, groupJid) => {
  try {
    // Cambiar la configuración del grupo (se puede elegir entre los valores disponibles)
    await socket.groupSettingUpdate(groupJid, 'announcement'); // Solo permitir que los administradores envíen mensajes
    // await socket.groupSettingUpdate(groupJid, 'not_announcement'); // Permitir que todos envíen mensajes
    // await socket.groupSettingUpdate(groupJid, 'unlocked'); // Permitir que todos modifiquen la configuración del grupo
    // await socket.groupSettingUpdate(groupJid, 'locked'); // Solo permitir que los administradores modifiquen la configuración del grupo

    return { success: true }; // Retorna un objeto con éxito
  } catch (error) {
    console.error("Error al actualizar la configuración del grupo:", error);
    return { success: false, error: error.message }; // Retorna un objeto con el error
  }
};