const { Telegraf, Markup } = require("telegraf");
const express = require("express");
require("dotenv").config();

const token = process.env.TOKEN;
const bot = new Telegraf(token);
const PORT = process.env.PORT || 4100;

const app = express();
app.listen(PORT, () => console.log(`Server is runnign in ${PORT}`));

app.get("/", (req, res) => {
  res.send("Hello world");
});

console.log("Successfully started");

const commands = [{ command: "start", description: "Botni ishga tushirish" }];

bot.telegram.setMyCommands(commands);

const mainMessage = (ctx) => {
  // Define your inline keyboard buttons
  const inlineKeyboard = Markup.inlineKeyboard([
    Markup.button.url("Arslon", "https://t.me/f1eepalastine"),
    Markup.button.url("Nodir", "https://t.me/COD1019"),
    Markup.button.url("Abduvali", "https://t.me/novator4"),
    Markup.button.url("Jakhon", "https://t.me/murodowic"),
    Markup.button.url("Shakhzod", "https://t.me/Shaxzod_3330"),
  ]).resize();

  // Send a message with the inline keyboard
  ctx.reply("Mutaxasislarimizdan birini tanlang:", inlineKeyboard);
};

bot.command("start", (ctx) => {
  const keyboard = Markup.keyboard([
    ["Vebsayt yasattirish", "Logo yasattirish"],
    ["Reklama tayyorlatish"],
  ]).resize(true);

  ctx.reply(
    `👋 Assalomu alaykum hurmatli ${ctx.from.first_name}. \n 👍 botga xush kelibsiz. \n ✅ Siz eng tajribali xodimlardan eng sifatli mahsulotlarni \n qabul qilib olishni istaganlar uchun yaratilgan botga keldingiz.`,
    keyboard
  );
});

bot.hears("Vebsayt yasattirish", (ctx) => {
  mainMessage(ctx);
});

bot.hears("Logo yasattirish", (ctx) => {
  mainMessage(ctx);
});

bot.hears("Reklama tayyorlatish", (ctx) => {
  mainMessage(ctx);
});

bot.launch();
