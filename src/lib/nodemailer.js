import nodemailer from 'nodemailer';
import { SMTPClient } from 'emailjs'

// async..await is not allowed in global scope, must use a wrapper
export async function mail(body) {
    console.log(223344,body)
  try {

    const mailclient = new SMTPClient({
      user: 'darom@darom.tk',
      password: 'roge816013',
      host: 'smtp.yandex.ru',
      ssl: true,
    })

    const message =  mailclient.sendAsync({
      text: 'это письмо darom prod',
      from: 'you <darom@darom.tk>',
      to: 'someone <1@melochevka.ru>, another <melochevka@melochevka.ru>',
      cc: 'else <dollar123@mail.ru>',
      subject: 'это письмо darom prod',
        });

      /* let testAccount = await nodemailer.createTestAccount();
      let transporter = nodemailer.createTransport({
        ///host: "smtp.ethereal.email",
    	host: "smtp.yandex.ru",
     // host: "smtp.mail.ru",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'darom@darom.tk',
          //  user: 'dimak00@internet.ru',
            pass: 'roge816013'
            //pass: 'WPKhp4fz4coWoPWGXK3u'
        },
      });

      let info = await transporter.sendMail({
        from: '"Dmitrii Kostiunin" <darom@darom.tk>', // sender address
        to: "1@melochevka.ru", // list of receivers
        subject: "Hello ✔", // Subject line
        text:body, // plain text body
        html:body, // html body
      });

      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info)); */
  }
  catch (error) {
    console.log(error)
  }
}


//mail().catch(console.error);