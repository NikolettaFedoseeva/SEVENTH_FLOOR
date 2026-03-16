import { Router } from 'express';
import { sendMail } from '../services/mailService';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();

router.post('/', async (req, res) => {
  const { name, phone, email, message } = req.body;

  // Simple validation
  if (!name || !phone || !message) {
    return res.status(400).json({ error: 'Имя, телефон и сообщение обязательны для заполнения' });
  }

  try {
    const companyEmail = process.env.COMPANY_EMAIL || 'seventhfloor@seventhfloor.md';
    
    const mailText = `
Новая заявка с сайта СЕДЬМОЙ ЭТАЖ:
----------------------------------
Имя: ${name}
Телефон: ${phone}
Email: ${email || 'не указан'}
Сообщение:
${message}
----------------------------------
    `;

    const mailHtml = `
<h2>Новая заявка с сайта СЕДЬМОЙ ЭТАЖ</h2>
<p><b>Имя:</b> ${name}</p>
<p><b>Телефон:</b> ${phone}</p>
<p><b>Email:</b> ${email || 'не указан'}</p>
<p><b>Сообщение:</b></p>
<div style="padding: 10px; background: #f4f4f4; border-left: 4px solid #007bff;">
  ${message.replace(/\n/g, '<br>')}
</div>
    `;

    await sendMail({
      to: companyEmail,
      subject: `Новая заявка: ${name}`,
      text: mailText,
      html: mailHtml,
    });

    res.json({ success: true, message: 'Заявка успешно отправлена' });
  } catch (error) {
    console.error('Error handling contact form:', error);
    res.status(500).json({ error: 'Ошибка при отправке заявки. Пожалуйста, попробуйте позже.' });
  }
});

export default router;
