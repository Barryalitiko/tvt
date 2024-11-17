const { DangerError } = require("../errors/DangerError");
const { InvalidParameterError } = require("../errors/InvalidParameterError");
const { WarningError } = require("../errors/WarningError");
const { findCommandImport } = require(".");
const {
  verifyPrefix,
  hasTypeOrCommand,
  isLink,
  isAdmin,
} = require("../middlewares");
const { checkPermission } = require("../middlewares/checkPermission");
const {
  isActiveGroup,
  getAutoResponderResponse,
  isActiveAutoResponderGroup,
  isActiveAntiLinkGroup,
} = require("./database");
const { errorLog } = require("../utils/logger");
const { ONLY_GROUP_ID } = require("../config");

exports.dynamicCommand = async (paramsHandler) => {
  const {
    commandName,
    prefix,
    sendWarningReply,
    sendErrorReply,
    remoteJid,
    sendReply,
    socket,
    userJid,
    fullMessage,
    webMessage,
  } = paramsHandler;

  if (isActiveAntiLinkGroup(remoteJid) && isLink(fullMessage)) {
    if (!(await isAdmin({ remoteJid, userJid, socket }))) {
      await socket.groupParticipantsUpdate(remoteJid, [userJid], "remove");

      await sendReply(
        "`👻 𝙺𝚛𝚊𝚖𝚙𝚞𝚜.𝚋𝚘𝚝 👻`
        Kram tiene ordenes de no permitir links 🦇"
      );

      await socket.sendMessage(remoteJid, {
        delete: {
          remoteJid,
          fromMe: false,
          id: webMessage.key.id,
          participant: webMessage.key.participant,
        },
      });

      return;
    }
  }

  const { type, command } = findCommandImport(commandName);

  if (ONLY_GROUP_ID && ONLY_GROUP_ID !== remoteJid) {
    return;
  }

  if (!verifyPrefix(prefix) || !hasTypeOrCommand({ type, command })) {
    if (isActiveAutoResponderGroup(remoteJid)) {
      const response = getAutoResponderResponse(fullMessage);

      if (response) {
        await sendReply(response);
      }
    }

    return;
  }

  if (!(await checkPermission({ type, ...paramsHandler }))) {
    await sendErrorReply("`👻 𝙺𝚛𝚊𝚖𝚙𝚞𝚜.𝚋𝚘𝚝 👻`
                         No tienes permitido usar este comando");
    return;
  }

  if (!isActiveGroup(remoteJid) && command.name !== "on") {
    await sendWarningReply(
      "`👻 𝙺𝚛𝚊𝚖𝚙𝚞𝚜.𝚋𝚘𝚝 👻`
      Este grupo no está habilitado. Pida a algún admin que active Krampus"
    );

    return;
  }

  try {
    await command.handle({
      ...paramsHandler,
      type,
    });
  } catch (error) {
    if (error instanceof InvalidParameterError) {
      await sendWarningReply(`Parâmetros inválidos! ${error.message}`);
    } else if (error instanceof WarningError) {
      await sendWarningReply(error.message);
    } else if (error instanceof DangerError) {
      await sendErrorReply(error.message);
    } else {
      errorLog("Error con el comando", error);
      await sendErrorReply(
        ``👻 𝙺𝚛𝚊𝚖𝚙𝚞𝚜.𝚋𝚘𝚝 👻`
        Ocurrió un error al intentar usar el comando ${command.name}! Ya fue notificado!
      
📄 *Detalles*: ${error.message}`
      );
    }
  }
};
