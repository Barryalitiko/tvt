const { makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const path = require('path');
const qrcode = require('qrcode-terminal');  

const sessionPath = path.join(__dirname, 'session');
const { state, saveState } = useMultiFileAuthState(sessionPath);

const connectKrampus = async () => {
    const sock = makeWASocket({
        auth: state, 
    });

    sock.ev.on('qr', (qr) => {
        console.log('Generando QR...');
        qrcode.generate(qr, { small: true }); 
    });

    sock.ev.on('open', () => {
        console.log('Conexión establecida exitosamente!');
    });

    sock.ev.on('close', ({ reason }) => {
        console.log('Conexión cerrada:', reason);
    });

    sock.ev.on('error', (error) => {
        console.error('Error:', error);
    });

    sock.ev.on('auth-state.update', (authState) => {
        saveState(authState); 
    });

    return sock;
};

connectKrampus().catch(console.error);
