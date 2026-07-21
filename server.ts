import "dotenv/config";
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import fs from "fs";

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT || 3000);
  const allowedOrigins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://nikitajourney.github.io"
  ];

  // Middleware for parsing JSON and form bodies
  app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (origin && allowedOrigins.includes(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
      res.setHeader("Vary", "Origin");
    }
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
      return res.sendStatus(204);
    }

    next();
  });

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API routes FIRST
  app.get("/api/debug-env", (req, res) => {
    res.json({
      NODE_ENV: process.env.NODE_ENV,
      cwd: process.cwd(),
      hasDist: fs.existsSync(path.join(process.cwd(), "dist")),
      hasDistIndex: fs.existsSync(path.join(process.cwd(), "dist", "index.html")),
      envKeys: Object.keys(process.env)
    });
  });

  app.post("/api/lead", async (req, res) => {
    const { name, phone, email, coursePrice, messenger } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ error: "Имя и телефон обязательны для заполнения" });
    }

    const price = coursePrice || "4500";
    const selectedMessenger = messenger || "Не указан";
    const emailVal = email || "Не указан";

    console.log(`[Lead received] Name: ${name}, Phone: ${phone}, Email: ${emailVal}, Price: ${price} RUB, Messenger: ${selectedMessenger}`);

    let telegramSent = false;
    let vkSent = false;
    let emailSent = false;
    let errors: string[] = [];

    const plainLeadText =
      `Новая заявка на курс!\n\n` +
      `Имя: ${name}\n` +
      `Телефон: ${phone}\n` +
      `Email: ${emailVal}\n` +
      `Связь: ${selectedMessenger}\n` +
      `Сумма: ${price} ₽\n` +
      `Дата: ${new Date().toLocaleString('ru-RU')}`;

    // 1. Send via Telegram Bot API
    const tgToken = process.env.TELEGRAM_BOT_TOKEN;
    const tgChatId = process.env.TELEGRAM_CHAT_ID;

    if (tgToken && tgChatId) {
      try {
        const text = `🔔 <b>Новая заявка на курс!</b>\n\n` +
          `👤 <b>Имя:</b> ${name}\n` +
          `📞 <b>Телефон:</b> <code>${phone}</code>\n` +
          `✉️ <b>Email:</b> ${emailVal}\n` +
          `💬 <b>Связь:</b> ${selectedMessenger}\n` +
          `💰 <b>Сумма:</b> ${price} ₽\n` +
          `📅 <b>Дата:</b> ${new Date().toLocaleString('ru-RU')}`;

        const tgUrl = `https://api.telegram.org/bot${tgToken}/sendMessage`;
        const response = await fetch(tgUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: tgChatId,
            text: text,
            parse_mode: 'HTML'
          })
        });

        if (response.ok) {
          telegramSent = true;
          console.log("Telegram notification sent successfully.");
        } else {
          const respText = await response.text();
          console.error("Telegram API returned error:", respText);
          errors.push(`Telegram error: ${respText}`);
        }
      } catch (err: any) {
        console.error("Failed to send to Telegram:", err);
        errors.push(`Telegram exception: ${err.message}`);
      }
    } else {
      console.log("Telegram integration skipped (TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is missing).");
    }

    // 2. Send via VK API. Requires a backend-hosted community token, never a VITE_* variable.
    const vkToken = process.env.VK_ACCESS_TOKEN;
    const vkPeerId = process.env.VK_PEER_ID;
    const vkApiVersion = process.env.VK_API_VERSION || "5.199";

    if (vkToken && vkPeerId) {
      try {
        const vkBody = new URLSearchParams({
          access_token: vkToken,
          v: vkApiVersion,
          peer_id: vkPeerId,
          random_id: String(Math.floor(Math.random() * 2147483647)),
          message: `🔔 ${plainLeadText}`
        });

        const response = await fetch("https://api.vk.com/method/messages.send", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: vkBody
        });
        const result = await response.json() as {
          response?: number;
          error?: { error_code?: number; error_msg?: string };
        };

        if (response.ok && result.response) {
          vkSent = true;
          console.log("VK notification sent successfully.");
        } else {
          const vkError = result.error
            ? `VK error ${result.error.error_code || ""}: ${result.error.error_msg || "unknown error"}`
            : "VK API returned an empty response.";
          console.error(vkError);
          errors.push(vkError);
        }
      } catch (err: any) {
        console.error("Failed to send to VK:", err);
        errors.push(`VK exception: ${err.message}`);
      }
    } else {
      console.log("VK integration skipped (VK_ACCESS_TOKEN or VK_PEER_ID is missing).");
    }

    // 3. Send via Email (SMTP using Nodemailer)
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const emailTo = process.env.EMAIL_TO;

    if (smtpHost && smtpUser && smtpPass && emailTo) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: parseInt(smtpPort || "465", 10),
          secure: parseInt(smtpPort || "465", 10) === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass
          }
        });

        const mailOptions = {
          from: smtpUser,
          to: emailTo,
          subject: `Новая заявка на обучение: ${name}`,
          text: plainLeadText,
          html: `<div style="font-family: sans-serif; padding: 20px; background-color: #f4f4f4;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 12px; border: 1px solid #e0e0e0;">
              <h2 style="color: #0d9488; margin-top: 0;">🔔 Новая заявка на обучение!</h2>
              <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <tr style="border-bottom: 1px solid #eeeeee;">
                  <td style="padding: 10px 0; font-weight: bold; color: #666666;">Имя:</td>
                  <td style="padding: 10px 0; color: #333333;">${name}</td>
                </tr>
                <tr style="border-bottom: 1px solid #eeeeee;">
                  <td style="padding: 10px 0; font-weight: bold; color: #666666;">Телефон:</td>
                  <td style="padding: 10px 0; color: #333333; font-family: monospace;">${phone}</td>
                </tr>
                <tr style="border-bottom: 1px solid #eeeeee;">
                  <td style="padding: 10px 0; font-weight: bold; color: #666666;">Email:</td>
                  <td style="padding: 10px 0; color: #333333;">${emailVal}</td>
                </tr>
                <tr style="border-bottom: 1px solid #eeeeee;">
                  <td style="padding: 10px 0; font-weight: bold; color: #666666;">Способ связи:</td>
                  <td style="padding: 10px 0; color: #333333;">${selectedMessenger}</td>
                </tr>
                <tr style="border-bottom: 1px solid #eeeeee;">
                  <td style="padding: 10px 0; font-weight: bold; color: #666666;">Стоимость:</td>
                  <td style="padding: 10px 0; color: #0d9488; font-weight: bold;">${price} ₽</td>
                </tr>
              </table>
              <p style="font-size: 11px; color: #999999; margin-top: 30px; text-align: center;">Письмо отправлено автоматически с сайта школы массажа.</p>
            </div>
          </div>`
        };

        await transporter.sendMail(mailOptions);
        emailSent = true;
        console.log("Email notification sent successfully.");
      } catch (err: any) {
        console.error("Failed to send Email:", err);
        errors.push(`Email exception: ${err.message}`);
      }
    } else {
      console.log("Email integration skipped (SMTP environment variables missing).");
    }

    return res.status(200).json({
      success: true,
      message: "Заявка успешно получена!",
      data: { name, phone, email: emailVal, price, messenger: selectedMessenger },
      notifications: {
        telegram: { sent: telegramSent, configured: !!(tgToken && tgChatId) },
        vk: { sent: vkSent, configured: !!(vkToken && vkPeerId) },
        email: { sent: emailSent, configured: !!(smtpHost && smtpUser && smtpPass && emailTo) }
      },
      errors: errors.length > 0 ? errors : null
    });
  });

  // Serve the live uploaded images folder directly from the workspace so that newly uploaded files are always immediately available
  app.use('/src/assets/images', express.static(path.join(process.cwd(), 'src/assets/images')));

  // Check if pre-compiled dist files exist and serve them first to avoid development middleware issues
  const distPath = path.join(process.cwd(), 'dist');
  const hasDist = fs.existsSync(path.join(distPath, 'index.html'));

  if (hasDist) {
    console.log("Serving pre-compiled files from dist...");
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  } else if (process.env.NODE_ENV !== "production") {
    console.log("Starting in Vite development middleware mode...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.get('*', (req, res) => {
      res.status(500).send("Application not compiled. Please run npm run build.");
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
