import 'dotenv/config';
import fetch from 'node-fetch';
import schedule from 'node-schedule';

// Данные из .env
const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

// Функция для отправки сообщения
async function sendTelegramMessage(text) {
  const url = `https://api.telegram.org/bot${'7710383049:AAE5MXdVIK8U7JQtE_74GQsK1ZdvBH63VMQ'}/sendMessage`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: text,
      parse_mode: "HTML"
    })
  });

  if (!res.ok) {
    const error = await res.text();
    console.error("Ошибка при отправке:", error);
  } else {
    console.log("✅ Уведомление отправлено:", text);
  }
}

// 📅 Расписание: каждую субботу в 10:00
schedule.scheduleJob('0 10 * * 6', async () => {
  const message = `📢 Напоминание: сегодня ваша очередь дежурства!`;
  await sendTelegramMessage(message);
});
