const { default: makeWASocket } = require('@whiskeysockets/baileys');
const qrcode = require('qrcode-terminal');

async function connectKrampus() {
    const sock = makeWASocket();
    
    sock.ev.on('connection.update', (update) => {
        const { connection, qr } = update;
        if (qr) qrcode.generate(qr, { small: true });
        if (connection === 'open') console.log('Krampus está conectado a WhatsApp');
    });

    sock.ev.on('messages.upsert', async ({ messages }) => {
        const msg = messages[0];
       
        if (msg.message) {
            console.log('Mensaje recibido:', msg);
            
            await sock.sendMessage(msg.key.remoteJid, { text: '¡Hola! Soy Krampus, tu bot de prueba.' });
        }
    });
}

connectKrampus();
