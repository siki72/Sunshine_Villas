import React, { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import emailjs from "@emailjs/browser";
import ReactModal from "react-modal";

const Message_form = () => {
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const refCaptcha = useRef();
  const formSendMsgRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    setPending(true);
    const recaptchaValue = refCaptcha.current;
    const data = new FormData(formSendMsgRef.current);

    const messageData = {
      name: data.get("name"),
      email: data.get("email"),
      message: data.get("message"),
      recaptchaValue: recaptchaValue,
    };
    emailjs
      .sendForm(
        "service_cgeo4ys",
        "template_znm3cd9",
        formSendMsgRef.current,
        "H8UNba3j5-DBrjR1E"
      )
      .then(
        (result) => {
          console.log(result);
          setPending(false);
          setSuccess(true);
        },
        (error) => {
          console.log(error);
        }
      )
      .finally(() => {
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      });
  };

  return (
    <div className="send-message">
      <div className="send-message-img">
        <img src="../img/home/message-page.jpeg" alt="villas picture" />
      </div>
      <div className="send-message-form">
        <h2 className={success ? "succes-send-mgs" : "h2-send"}>
          {success ? "message sent successfully" : "Send us a message"}
        </h2>

        <form
          ref={formSendMsgRef}
          action=""
          method="post"
          onSubmit={handleSubmit}
        >
          <div className="input-groups name">
            <label htmlFor="fullName">Full Name</label>
            <input
              name="name"
              type="text"
              id="fullName"
              autoComplete="false"
              placeholder="Your Name"
            />
          </div>
          <div className="input-groups email">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="text"
              id="email"
              autoComplete="false"
              placeholder="Your Email"
            />
          </div>
          <div className="input-groups message">
            <label htmlFor="message" placeholder="Your Message">
              Message
            </label>
            <textarea
              placeholder="Your message"
              name="message"
              id="message"
              cols="30"
              rows="6"
            ></textarea>
          </div>

          <ReCAPTCHA
            size="normal"
            theme="dark"
            id="recaptcha"
            ref={refCaptcha}
            sitekey="6Lc60B0lAAAAAMfHBQWq5BoMN9a_kXd2s3mLCAvQ"
          />
          <button
            className={pending ? "send-notAllowed" : "send"}
            type="submit"
          >
            {pending ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Message_form;
