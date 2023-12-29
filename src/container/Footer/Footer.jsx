import React, { useState } from "react";

import { images } from "../../constants";
import { AppWrap, MotionWrap } from "../../wrapper";
import { client } from "../../client";
import "./Footer.scss";

const Footer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const [loading, setLoading] = useState(false);

  const { name, email, message } = formData;
  const handleChangeInput = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    setLoading(true);

    const contact = {
      _type: "contact",
      name: name,
      email: email,
      message: message,
    };

    client.create(contact).then(() => {
      setLoading(false);
      setIsFormSubmitted(true);
    });
  };
  return (
    <>
      <h2 className="head-text">Contact with me</h2>

      <div className="app__footer-cards">
        <div className="app__footer-card">
          <img src={images.email} alt="email" />
          <a href="mailto:tuanngoc0298@gmail.com" className="p-text">
            tuanngoc0298@gmail.com
          </a>
        </div>

        <div className="app__footer-card">
          <img src={images.facebook} alt="mobile" />
          <a
            href="https://www.facebook.com/tuan.phanngoc.311/?locale=vi_VN"
            target="_blank"
            rel="noreferrer"
            className="p-text"
          >
            Facebook
          </a>
        </div>
      </div>

      {!isFormSubmitted ? (
        <div className="app__footer-form app__flex">
          <div className="app__flex">
            <input
              type="text"
              className="p-text"
              placeholder="Your name"
              value={name}
              onChange={handleChangeInput}
              name="name"
            />
          </div>

          <div className="app__flex">
            <input
              type="text"
              className="p-text"
              placeholder="Your email"
              value={email}
              onChange={handleChangeInput}
              name="email"
            />
          </div>

          <div>
            <textarea
              name="message"
              className="p-text"
              placeholder="Your message"
              value={message}
              onChange={handleChangeInput}
            ></textarea>
          </div>
          <button
            type="button"
            className="p-text"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Sending" : "Send Message"}
          </button>
        </div>
      ) : (
        <div>
          <h3 className="head-text">Thank you for getting in touch</h3>
        </div>
      )}
    </>
  );
};

export default AppWrap(
  MotionWrap(Footer, "app__footer"),
  "contact",
  "app__primarybg"
);
