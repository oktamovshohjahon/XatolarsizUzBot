const mongoose = require("mongoose");
require("dotenv").config();
const express = require("express");

const app = express();

app.listen(3000, function () {
  console.log("App listening on port: 3000");
});

const token = "6785338288:AAGl6zAXE_f68skDRenvMZk1jKxKwgZM5oU";
function ozbekToCyrillic(text) {
  const ozbekToCyrillicMap = {
    a: "а",
    b: "б",
    d: "д",
    e: "е",
    f: "ф",
    g: "г",
    h: "x",
    i: "и",
    j: "ж",
    k: "к",
    l: "л",
    m: "м",
    n: "н",
    o: "о",
    p: "п",
    q: "қ",
    r: "р",
    s: "с",
    t: "т",
    u: "у",
    v: "в",
    x: "ҳ",
    y: "й",
    z: "з",
    ya: "я",
    Ya: "Я",
    yu: "ю",
    Yu: "Ю",
    sh: "ш",
    ch: "ч",
    ng: "нг",
    gh: "ғ",
    shch: "щ",
    ya: "я",
    yo: "ё",
    ye: "э",
    yu: "ю",
    zh: "ж",
    A: "А",
    B: "Б",
    D: "Д",
    E: "Е",
    F: "Ф",
    G: "Г",
    H: "X",
    I: "И",
    J: "Ж",
    K: "К",
    L: "Л",
    M: "М",
    N: "Н",
    O: "О",
    P: "П",
    Q: "Қ",
    R: "Р",
    S: "С",
    T: "Т",
    U: "У",
    V: "В",
    X: "Ҳ",
    Y: "Й",
    Z: "З",
    Sh: "Ш",
    Ch: "Ч",
    Ng: "НГ",
    Gn: "Г",
    Snch: "Щ",
    Ya: "Я",
    Yo: "Ё",
    Ye: "Э",
    Yu: "Ю",
    Zh: "Ж",
    "O'": "Ў",
    "o'": "ў",
    "o`": "ў",
    "O`": "Ў",
    "o’": "ў",
    "O’": "Ў",
    "G'": "Ғ",
    "g'": "ғ",
    g: "г",
    "G`": "Ғ",
    "g`": "ғ",
    "G’": "Ғ",
    "g’": "ғ",
    а: "a",
    б: "b",
    д: "d",
    е: "e",
    ф: "f",
    г: "g",
    ҳ: "x",
    и: "i",
    ж: "j",
    к: "k",
    л: "l",
    м: "m",
    н: "n",
    о: "o",
    п: "p",
    қ: "q",
    р: "r",
    с: "s",
    т: "t",
    у: "u",
    в: "v",
    х: "x",
    ц: "s",
    й: "y",
    з: "z",
    А: "A",
    Б: "B",
    Д: "D",
    Е: "E",
    Ф: "F",
    Г: "G",
    Ҳ: "H",
    И: "I",
    Ж: "J",
    К: "K",
    Л: "L",
    М: "M",
    Н: "N",
    О: "O",
    П: "P",
    Қ: "Q",
    Р: "R",
    С: "S",
    Т: "T",
    У: "U",
    В: "V",
    Х: "X",
    Й: "Y",
    З: "Z",
    Ц: "S",
    ш: "sh",
    Ш: "Sh",
    щ: "sh",
    Щ: "Sh",
    ъ: "'",
    Ъ: "'",
    ы: "",
    Ы: "",
    э: "e",
    Э: "E",
    ю: "yu",
    Ю: "Yu",
    Я: "Ya",
    я: "ya",
    ч: "ch",
    Ч: "Ch",
    ь: "",
    Ь: "",
  };

  let result = "";
  let i = 0;
  while (i < text.length) {
    let currentChar = text[i];
    if (i < text.length - 1) {
      let doubleChar = text[i] + text[i + 1];
      if (ozbekToCyrillicMap[doubleChar]) {
        result += ozbekToCyrillicMap[doubleChar];
        i += 2;
        continue;
      }
    }
    if (ozbekToCyrillicMap[currentChar]) {
      result += ozbekToCyrillicMap[currentChar];
    } else {
      result += currentChar;
    }
    i++;
  }
  return result;
}

function middlewareFunction(msg, next) {
  bot.on("text", async (ctx) => {
    const ozbekText = ctx.message.text;
    const cyrillicText = ozbekToCyrillic(ozbekText);
    if (
      ozbekText != "/translate" &&
      ozbekText != "/lotinkirill" &&
      ozbekText != "/start" &&
      ozbekText != "/xato" &&
      ozbekText != "/count" &&
      ozbekText != "/admin" &&
      lotinKirillCliked == 1 &&
      countKirillCliked != 1 &&
      translateKirillCliked != 1 &&
      xatoKirillCliked != 1
    ) {
      ctx.reply(cyrillicText);
    }
  });
  next();
}

const middlewareFunction2 = async (msg, next) => {
  bot.on("message", async (msg) => {
    const users = await User.find();
    const userIds = [];
    users.forEach((user) => {
      userIds.push(user.chatId);
    });
    const uniqueArray = Array.from(new Set(userIds));
    uniqueArray.forEach((id) => {
      if (
        msg.text != "/translate" &&
        msg.text != "/lotinkirill" &&
        msg.text != "/start" &&
        msg.text != "/xato" &&
        msg.text != "/count" &&
        msg.text != "/admin"
      ) {
        const messagePhoto = msg.photo ? msg.photo[0].file_id : null; // Xabarga oid rasm
        const videoId = msg.video ? msg.video.file_id : null; // Videoning file_id si
        const messageCaption = msg.caption; // Xabarga oid sarlavha
        const buttonOptions = msg.reply_markup
          ? msg.reply_markup.inline_keyboard
          : null;

        if (messagePhoto) {
          bot.sendPhoto(id, messagePhoto, {
            caption: messageCaption,
            reply_markup: { inline_keyboard: buttonOptions },
          });
        } else if (videoId) {
          bot.sendVideo(id, videoId, {
            caption: messageCaption,
            reply_markup: { inline_keyboard: buttonOptions },
          });
        } else if (messageText) {
          bot.sendMessage(messageText);
        }
      }
    });
  });
  next();
};

const { Telegraf, Scenes, session, Markup } = require("telegraf");

const bot = new Telegraf(token);

const connect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://oktamovshohjahon596:xeLDY5SBSVDTIPsT@cluster0.a7h8pkd.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error);
  }
};

connect();

const botCommands = [
  {
    command: "/start",
    description: "Ishga tushirish",
  },
  {
    command: "/lotinkirill",
    description: "Bexato o'girish",
  },
  {
    command: "/translate",
    description: "Tarjima qilish",
  },
  {
    command: "/xato",
    description: "Xatolik jo'natish",
  },
  {
    command: "/count",
    description: "Foydalanuvchilar soni",
  },
  // Add more commands as needed
];

const startCommand = async (ctx) => {
  console.log(1);

  ctx.reply(`
    @Xatolarsiz1bot га хуш келибсиз.
  Сизга ёрдам берганимиздан хурсандмиз.
  Агар бизда хатоликни аниқласангиз /xato буйруғи орқали бизга жўнатинг.
  
  Бизнинг канал: @xatolarsiz
  
  Реклама учун: @xatolarsizADS (https://t.me/xatolarsizADS)
    `);
};

bot.command("start", (ctx) => {
  startCommand(ctx);
});

const translateCommand = (ctx) => {
  ctx.reply(`⚠ Кечирасиз,  таржима қилиш хизмати вақтинча тўхтатилган`);
};

const lotinkirillCommand = (ctx) => {
  // bot.command("lotinkirill", (ctx) => {
  ctx.scene.enter("scene1");
  // });
};

const xatoCommand = (ctx) => {
  // bot.command("xato", (ctx) => {
  ctx.scene.enter("scene2");
  // });
};

const countCommand = async (ctx) => {
  // bot.command("count", async (ctx) => {
  const users = await User.find();
  const userIds = [];
  users.forEach((user) => {
    userIds.push(user.chatId);
  });
  const uniqueArray = Array.from(new Set(userIds));
  return ctx.reply(`Фойдаланувчилар сони: ${uniqueArray.length}`);
  // });
};

const adminCommand = async (ctx) => {
  const chatId = ctx.from.id;
  if (chatId == 2095960669 || chatId == 6092892179) {
    const users = await User.find();
    const userIds = [];
    users.forEach((user) => {
      userIds.push(user.chatId);
    });
    const uniqueArray = Array.from(new Set(userIds));
    uniqueArray.forEach((id) => {
      if (
        ctx.message.text != "/translate" &&
        ctx.message.text != "/lotinkirill" &&
        ctx.message.text != "/start" &&
        ctx.message.text != "/xato" &&
        ctx.message.text != "/count" &&
        ctx.message.text != "/admin"
      ) {
        const messagePhoto = ctx.message.photo
          ? ctx.message.photo[ctx.message.photo.length - 1].file_id
          : null; // Xabarga oid rasm
        const videoId = ctx.message.video ? ctx.message.video.file_id : null; // Videoning file_id si
        const messageCaption = ctx.message.caption ? ctx.message.caption : null; // Xabarga oid sarlavha
        const buttonOptions = ctx.message.reply_markup
          ? JSON.stringify(ctx.message.reply_markup)
          : null;
        const messageText = ctx.message.text;

        if (messagePhoto && messageCaption && !buttonOptions) {
          console.log(1);
          ctx.telegram.sendPhoto(id, messagePhoto, { caption: messageCaption });
        } else if (messagePhoto && buttonOptions && !messageCaption) {
          ctx.telegram.sendPhoto(id, messagePhoto, {
            reply_markup: buttonOptions,
          });
        } else if (messagePhoto && buttonOptions && messageCaption) {
          console.log(3);
          ctx.telegram.sendPhoto(id, messagePhoto, {
            reply_markup: buttonOptions,
            caption: messageCaption,
          });
          return 0;
        } else if (messageText && buttonOptions) {
          ctx.telegram.sendMessage(id, messageText, {
            reply_markup: buttonOptions,
          });
          return 0;
        }
        if (videoId && messageCaption && !buttonOptions) {
          ctx.telegram.sendVideo(id, videoId, { caption: messageCaption });
          return 0;
        } else if (videoId && buttonOptions && !messageCaption) {
          console.log(1);
          ctx.telegram.sendVideo(id, messagePhoto, {
            reply_markup: buttonOptions,
          });
          return 0;
        } else if (videoId && buttonOptions && messageCaption) {
          ctx.telegram.sendVideo(id, videoId, {
            reply_markup: buttonOptions,
            caption: messageCaption,
          });
          return 0;
        } else if (messagePhoto && !buttonOptions && !messageCaption) {
          ctx.telegram.sendPhoto(id, messagePhoto);
          return 0;
        } else if (videoId && !buttonOptions && !messageCaption) {
          ctx.telegram.sendVideo(id, videoId);
          return 0;
        } else if (messageText) {
          ctx.telegram.sendMessage(id, messageText);
          return 0;
        }
      }
    });
  } else {
    bot.sendMessage("Siz admin emassiz !");
  }
};

const stage = new Scenes.Stage();

// Scene 1
const scene1 = new Scenes.BaseScene("scene1");
scene1.enter((ctx) => ctx.reply("Исталган алифбодаги матнни жўнатинг!"));
scene1.on("text", (ctx) => {
  const ozbekText = ctx.message.text;
  const cyrillicText = ozbekToCyrillic(ozbekText);
  if (
    ozbekText != "/translate" &&
    ozbekText != "/lotinkirill" &&
    ozbekText != "/start" &&
    ozbekText != "/xato" &&
    ozbekText != "/count" &&
    ozbekText != "/admin"
  ) {
    ctx.reply(cyrillicText);
  } else {
    if (ozbekText == "/translate") {
      translateCommand(ctx);
    } else if (ozbekText == "/lotinkirill") {
      lotinkirillCommand(ctx);
    } else if (ozbekText == "/start") {
      startCommand(ctx);
    } else if (ozbekText == "/xato") {
      xatoCommand(ctx);
    } else if (ozbekText == "/count") {
      countCommand(ctx);
    } else if (ozbekText == "/admin") {
      adminCommand(ctx);
    }
    ctx.scene.leave();
  }
});

// Scene 2
const scene2 = new Scenes.BaseScene("scene2");
scene2.enter((ctx) =>
  ctx.reply("Бизга хатоликга эга сўзни ёки сўзларни жўнатинг.")
);
scene2.on("text", (ctx) => {
  if (
    ctx.message.text != "/translate" &&
    ctx.message.text != "/lotinkirill" &&
    ctx.message.text != "/start" &&
    ctx.message.text != "/xato" &&
    ctx.message.text != "/count" &&
    ctx.message.text != "/admin"
  ) {
    ctx.telegram.sendMessage(2095960669, ctx.message.text);
    ctx.reply(
      "Бизга ёрдам берганингиз учун катта раҳмат. Тез орада камчиликни тўғрилаймиз."
    );
  } else {
    if (ctx.message.text == "/translate") {
      translateCommand();
    } else if (ctx.message.text == "/lotinkirill") {
      lotinkirillCommand();
    } else if (ctx.message.text == "/start") {
      startCommand();
    } else if (ctx.message.text == "/xato") {
      xatoCommand();
    } else if (ctx.message.text == "/count") {
      countCommand();
    } else if (ctx.message.text == "/admin") {
      adminCommand();
    }
    ctx.scene.leave();
  }
});

// Scene 3
const scene3 = new Scenes.BaseScene("scene3");
scene3.enter((ctx) => ctx.reply("Reklamani kiriting"));
scene3.on("message", (ctx) => {
  if (
    ctx.message.text != "/translate" &&
    ctx.message.text != "/lotinkirill" &&
    ctx.message.text != "/start" &&
    ctx.message.text != "/xato" &&
    ctx.message.text != "/count" &&
    ctx.message.text != "/admin"
  ) {
    adminCommand(ctx);
  } else {
    if (ctx.message.text == "/translate") {
      translateCommand(ctx);
    } else if (ctx.message.text == "/lotinkirill") {
      lotinkirillCommand(ctx);
    } else if (ctx.message.text == "/start") {
      startCommand(ctx);
    } else if (ctx.message.text == "/xato") {
      xatoCommand(ctx);
    } else if (ctx.message.text == "/count") {
      countCommand(ctx);
    } else if (ctx.message.text == "/admin") {
      adminCommand(ctx);
    }
    ctx.scene.leave();
  }
});

// Registering the scenes
stage.register(scene1);
stage.register(scene2);
stage.register(scene3);

bot.use(session());
bot.use(stage.middleware());
bot.use(stage.middleware());
bot.use(stage.middleware());

bot.command("lotinkirill", (ctx) => {
  ctx.scene.enter("scene1");
});

bot.command("xato", (ctx) => {
  ctx.scene.enter("scene2");
});

bot.command("admin", (ctx) => {
  ctx.scene.enter("scene3");
  console.log("admin joined");
});

const Schema = mongoose.Schema;
const userSchema = new Schema({
  chatId: Number,
});
const User = mongoose.model("User", userSchema);

bot.command("start", async (ctx) => {
  const users = await User.find();
  const userIds = [];
  users.forEach((user) => {
    userIds.push(user.chatId);
  });
  const uniqueArray = Array.from(new Set(userIds));
  let a = true;
  uniqueArray.forEach((user) => {
    if (user == ctx.from.id) {
      a = false;
    }
  });

  if (a) {
    const user = new User({
      chatId: ctx.from.id,
    });
    await user.save();
  }
  // Implementation for the /start command
  ctx.reply(`
    @xatolarsizuzbot га хуш келибсиз.
  Сизга ёрдам берганимиздан хурсандмиз.
  Агар бизда хатоликни аниқласангиз /xato буйруғи орқали бизга жўнатинг.
  
  Бизнинг канал: @xatolarsiz
  
  Реклама учун: @xatolarsizADS (https://t.me/xatolarsizADS)
    `);
});

bot.command("translate", async (ctx) => {
  return ctx.reply(`⚠ Кечирасиз,  таржима қилиш хизмати вақтинча тўхтатилган`);
});

bot.command("count", async (ctx) => {
  const users = await User.find();
  const userIds = [];
  users.forEach((user) => {
    userIds.push(user.chatId);
  });
  const uniqueArray = Array.from(new Set(userIds));
  return ctx.reply(`Фойдаланувчилар сони: ${uniqueArray.length}`);
});

// bot.telegram
//   .setMyCommands(botCommands)
//   .then(() => {
//     console.log("Bot commands set successfully.");
//   })
//   .catch((error) => {
//     console.error("Error setting bot commands:", error);
//   });

bot.on("text", async (ctx) => {
  const msg = ctx.message.text;
  if (msg == "/start") {
    startCommand(ctx);
  } else if (msg == "/lotinkirill") {
    ctx.scene.enter("scene1");
  } else if (msg == "/translate") {
    translateCommand(ctx);
  } else if (msg == "/xato") {
    ctx.scene.enter("scene2");
  } else if (msg == "/count") {
    console.log(1);
    countCommand(ctx);
  } else if (msg == "/admin") {
    ctx.scene.enter("scene3");
  } else {
    const ozbekText = ctx.message.text;
    const cyrillicText = ozbekToCyrillic(ozbekText);
    if (
      ozbekText != "/translate" &&
      ozbekText != "/lotinkirill" &&
      ozbekText != "/start" &&
      ozbekText != "/xato" &&
      ozbekText != "/count" &&
      ozbekText != "/admin"
    ) {
      ctx.reply(cyrillicText);
    } else {
      if (ozbekText == "/translate") {
        translateCommand(ctx);
      } else if (ozbekText == "/lotinkirill") {
        lotinkirillCommand(ctx);
      } else if (ozbekText == "/start") {
        startCommand(ctx);
      } else if (ozbekText == "/xato") {
        xatoCommand(ctx);
      } else if (ozbekText == "/count") {
        countCommand(ctx);
      } else if (ozbekText == "/admin") {
        adminCommand(ctx);
      }
    }
  }
});

bot.launch();
