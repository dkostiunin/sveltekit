import nodemailer from 'nodemailer';

// async..await is not allowed in global scope, must use a wrapper
export async function mail(body) {
    console.log(223344,body)
  try {

      let testAccount = await nodemailer.createTestAccount();
      let transporter = nodemailer.createTransport({
        ///host: "smtp.ethereal.email",
    //	host: "smtp.yandex.ru",
      host: "smtp.mail.ru",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          //  user: 'darom@darom.tk',
            user: 'dimak00@internet.ru',
            //pass: '***'
            pass: 'WPKhp4fz4coWoPWGXK3u'
        },
      });

      let info = await transporter.sendMail({
        from: '"Dmitrii Kostiunin" <dimak00@internet.ru>', // sender address
        to: "1@melochevka.ru", // list of receivers
        subject: "Hello ✔", // Subject line
        text:body, // plain text body
        html:body, // html body
      });

      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.log(error)
  }
}


//mail().catch(console.error);