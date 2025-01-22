import nodemailer from 'nodemailer';

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'jakyaafrinb@gmail.com',
      pass: 'vcuv pzqq vazr vwgq',
    },
  });
  await transporter.sendMail({
    from: 'jakyaafrinb@gmail.com', // sender address
    to, // list of receivers
    subject: 'Reset your password within 10 mins!!', // Subject line
    text: '', // plain text body
    html, // html body
  });
};
