const mineflayer = require('mineflayer');
const http = require('http');

// Render port talab qilgani uchun oddiy server ochamiz
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Bot ishlayapti!\n');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Veb server ${PORT} portda ishga tushdi.`);
});

// Minecraft bot qismi
const bot = mineflayer.createBot({
  host: 'sherzod.aternos.me',
  port: 62297,
  version: '1.21.4',
  username: 'inmi_afkbot'
});

bot.on('spawn', () => {
  console.log("Bot serverga muvaffaqiyatli kirdi va ishga tushdi!");
  
  // Har 3 sekundda sakrab turish
  setInterval(() => {
    bot.setControlState('jump', true);
    setTimeout(() => {
      bot.setControlState('jump', false);
    }, 500);
  }, 3000);
});

bot.on('end', () => {
  console.log("Bot serverdan uzildi, qayta ulanishga harakat qilinmoqda...");
  setTimeout(() => {
    process.exit(1);
  }, 5000);
});

bot.on('error', (err) => {
  console.log("Xatolik yuz berdi: ", err);
});
