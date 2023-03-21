import React, { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const Message_form = () => {
  const refCaptcha = useRef();
  const formSendMsgRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    const recaptchaValue = refCaptcha.current;
    const data = new FormData(formSendMsgRef.current);

    const newUser = {
      name: data.get("name"),
      email: data.get("email"),
      message: data.get("message"),
      recaptchaValue: recaptchaValue,
    };
    console.log(newUser);
  };

  return (
    <div className="send-message">
      <div className="send-message-img">
        <img src="../img/home/message-page.jpeg" alt="" />
      </div>
      <div className="send-message-form">
        <h2>Send us a message</h2>

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
          <button id="send" type="submit">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Message_form;
