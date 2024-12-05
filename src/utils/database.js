const path = require("path");
const fs = require("fs");

const databasePath = path.resolve(__dirname, "..", "..", "database");

const INACTIVE_GROUPS_FILE = "inactive-groups";
const NOT_WELCOME_GROUPS_FILE = "not-welcome-groups";
const INACTIVE_AUTO_RESPONDER_GROUPS_FILE = "inactive-auto-responder-groups";
const ANTI_LINK_GROUPS_FILE = "anti-link-groups";
const NOT_GRUPO_GROUPS_FILE = "not-grupo-groups";  // Nueva constante para grupos de tipo "grupo"

function createIfNotExists(fullPath) {
  if (!fs.existsSync(fullPath)) {
    fs.writeFileSync(fullPath, JSON.stringify([]));
  }
}

function readJSON(jsonFile) {
  const fullPath = path.resolve(databasePath, `${jsonFile}.json`);

  createIfNotExists(fullPath);

  return JSON.parse(fs.readFileSync(fullPath, "utf8"));
}

function writeJSON(jsonFile, data) {
  const fullPath = path.resolve(databasePath, `${jsonFile}.json`);

  createIfNotExists(fullPath);

  fs.writeFileSync(fullPath, JSON.stringify(data));
}

// Funciones para manejar los grupos inactivos
exports.activateGroup = (groupId) => {
  const filename = INACTIVE_GROUPS_FILE;

  const inactiveGroups = readJSON(filename);

  const index = inactiveGroups.indexOf(groupId);

  if (index === -1) {
    return;
  }

  inactiveGroups.splice(index, 1);

  writeJSON(filename, inactiveGroups);
};

exports.deactivateGroup = (groupId) => {
  const filename = INACTIVE_GROUPS_FILE;

  const inactiveGroups = readJSON(filename);

  if (!inactiveGroups.includes(groupId)) {
    inactiveGroups.push(groupId);
  }

  writeJSON(filename, inactiveGroups);
};

exports.isActiveGroup = (groupId) => {
  const filename = INACTIVE_GROUPS_FILE;

  const inactiveGroups = readJSON(filename);

  return !inactiveGroups.includes(groupId);
};

// Funciones para manejar los grupos no bienvenidos
exports.activateWelcomeGroup = (groupId) => {
  const filename = NOT_WELCOME_GROUPS_FILE;

  const notWelcomeGroups = readJSON(filename);

  const index = notWelcomeGroups.indexOf(groupId);

  if (index === -1) {
    return;
  }

  notWelcomeGroups.splice(index, 1);

  writeJSON(filename, notWelcomeGroups);
};

exports.deactivateWelcomeGroup = (groupId) => {
  const filename = NOT_WELCOME_GROUPS_FILE;

  const notWelcomeGroups = readJSON(filename);

  if (!notWelcomeGroups.includes(groupId)) {
    notWelcomeGroups.push(groupId);
  }

  writeJSON(filename, notWelcomeGroups);
};

exports.isActiveWelcomeGroup = (groupId) => {
  const filename = NOT_WELCOME_GROUPS_FILE;

  const notWelcomeGroups = readJSON(filename);

  return !notWelcomeGroups.includes(groupId);
};

// Funciones para manejar los permisos de mensaje de grupo
exports.activateGroupMessages = (groupId) => {
  const filename = NOT_GRUPO_GROUPS_FILE; // Podrías usar otro archivo específico si lo prefieres

  const noMessageGroups = readJSON(filename);

  const index = noMessageGroups.indexOf(groupId);

  if (index === -1) {
    return;
  }

  noMessageGroups.splice(index, 1);

  writeJSON(filename, noMessageGroups);
};

exports.deactivateGroupMessages = (groupId) => {
  const filename = NOT_GRUPO_GROUPS_FILE; // Podrías usar otro archivo específico si lo prefieres

  const noMessageGroups = readJSON(filename);

  if (!noMessageGroups.includes(groupId)) {
    noMessageGroups.push(groupId);
  }

  writeJSON(filename, noMessageGroups);
};

exports.isGroupMessagesActive = (groupId) => {
  const filename = NOT_GRUPO_GROUPS_FILE; // Podrías usar otro archivo específico si lo prefieres

  const noMessageGroups = readJSON(filename);

  return !noMessageGroups.includes(groupId);
};

// Funciones para manejar el auto-responder
exports.getAutoResponderResponse = (match) => {
  const filename = "auto-responder";

  const responses = readJSON(filename);

  const matchUpperCase = match.toLocaleUpperCase();

  const data = responses.find(
    (response) => response.match.toLocaleUpperCase() === matchUpperCase
  );

  if (!data) {
    return null;
  }

  return data.answer;
};

exports.activateAutoResponderGroup = (groupId) => {
  const filename = INACTIVE_AUTO_RESPONDER_GROUPS_FILE;

  const inactiveAutoResponderGroups = readJSON(filename);

  const index = inactiveAutoResponderGroups.indexOf(groupId);

  if (index === -1) {
    return;
  }

  inactiveAutoResponderGroups.splice(index, 1);

  writeJSON(filename, inactiveAutoResponderGroups);
};

exports.deactivateAutoResponderGroup = (groupId) => {
  const filename = INACTIVE_AUTO_RESPONDER_GROUPS_FILE;

  const inactiveAutoResponderGroups = readJSON(filename);

  if (!inactiveAutoResponderGroups.includes(groupId)) {
    inactiveAutoResponderGroups.push(groupId);
  }

  writeJSON(filename, inactiveAutoResponderGroups);
};

exports.isActiveAutoResponderGroup = (groupId) => {
  const filename = INACTIVE_AUTO_RESPONDER_GROUPS_FILE;

  const inactiveAutoResponderGroups = readJSON(filename);

  return !inactiveAutoResponderGroups.includes(groupId);
};

// Funciones para manejar los grupos con anti-link
exports.activateAntiLinkGroup = (groupId) => {
  const filename = ANTI_LINK_GROUPS_FILE;

  const antiLinkGroups = readJSON(filename);

  if (!antiLinkGroups.includes(groupId)) {
    antiLinkGroups.push(groupId);
  }

  writeJSON(filename, antiLinkGroups);
};

exports.deactivateAntiLinkGroup = (groupId) => {
  const filename = ANTI_LINK_GROUPS_FILE;

  const antiLinkGroups = readJSON(filename);

  const index = antiLinkGroups.indexOf(groupId);

  if (index === -1) {
    return;
  }

  antiLinkGroups.splice(index, 1);

  writeJSON(filename, antiLinkGroups);
};

exports.isActiveAntiLinkGroup = (groupId) => {
  const filename = ANTI_LINK_GROUPS_FILE;

  const antiLinkGroups = readJSON(filename);

  return antiLinkGroups.includes(groupId);
};