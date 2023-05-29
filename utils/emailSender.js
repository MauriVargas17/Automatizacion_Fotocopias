const nodemailer = require('nodemailer');
const sendEmail = async (options) => {
  //   const transporter = nodemailer.createTransport({
  //     service: 'Gmail',
  //     auth: {
  //       user: process.env.EMAIL_ADDRESS,
  //       pass: process.env.EMAIL_PASSWORD,
  //     },
  //   });

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST_TEST,
    port: process.env.EMAIL_PORT_TEST,
    auth: {
      user: process.env.EMAIL_ADDRESS_TEST,
      pass: process.env.EMAIL_PASSWORD_TEST,
    },
  });

  const mailOptions = {
    from: 'Fotocopias UPB <fotocopias.upblpz@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
