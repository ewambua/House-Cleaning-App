import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import swal from 'sweetalert';


export const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_frjj88b', 'template_6yxi629', form.current, 'gGCrp2rNJ48xALizp')
      .then((result) => {

          console.log(result.text);
          swal("Good job!", "Your email has been sent!", "success");
      }, (error) => {
          console.log(error.text);
          swal("Oops!", "Something went wrong, please try again!", "error");
      });
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="user_name" />
      <label>Email</label>
      <input type="email" name="user_email" />
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" value="Send" />
    </form>
  );
};
