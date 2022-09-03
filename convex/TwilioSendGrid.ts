import sg from '@sendgrid/mail';
import { query } from './_generated/server';


export default query(async ({ db }, email: string, musathon: number) => {
    const API_KEY = process.env.API_KEY;
    sg.setApiKey(API_KEY);
    const message = {
      to: email, //insert email from form over here
      from: "23ab1107@wwprsd.org",
      subject: "You Joined " + musathon + " Musathon!",
      text:
        "Congrats on joining " + musathon + " Musathon! " 
    };
  
    sg.send(message)
      .then(() => {
       console.log('message sent!');
      })
      .catch(() => {
        console.log('message was not sent due to error!');
      });
  });
  
