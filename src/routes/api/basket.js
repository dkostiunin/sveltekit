import {mail} from '$lib/nodemailer';

export async function post({ params, request }) {
   const body = await request.json() // or request.json(), etc
    //await do_something_with(params, body);
    mail(body.phone)
    console.log(body)
   
    return { status: 201 };
  }