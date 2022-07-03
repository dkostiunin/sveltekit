import {mail} from '$lib/nodemailer';

export async function post({ params, request }) {
   const body = await request.json() // or request.json(), etc
    //await do_something_with(params, body);
    try {
      mail(body.phone)
    } catch (error) {
      console.log(error)
    }
   
    console.log(body)
   
    return { status: 201 };
  }