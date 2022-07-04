//import {mail} from '$lib/nodemailer';
import { SMTPClient } from 'emailjs';




export async function post({ params, request }) {
 // await console.log(888, params, request)
/*   const mailclient = new SMTPClient({
    user: 'darom@darom.tk',
    password: 'roge816013',
    host: 'smtp.yandex.ru',
    ssl: true,
  }); */
  // const body = await request.json() // or request.json(), etc
    //await do_something_with(params, body);
   /*  try {
      mail(body.phone)
    } catch (error) {
      console.log(error)
    } */
   
  /*   try {
			const message =  mailclient.sendAsync({
				text: 'это письмо darom prod',
				from: 'you <darom@darom.tk>',
				to: 'someone <1@melochevka.ru>, another <melochevka@melochevka.ru>',
				cc: 'else <dollar123@mail.ru>',
				subject: 'это письмо darom prod',
					});
			console.log(123456,message);
		} catch (err) {
			console.error(err);
		} */
   
   // console.log(4567895555,body)
   
    return { status: 201 };
  }