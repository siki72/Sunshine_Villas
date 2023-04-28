import React from "react";
import { Modal, Button } from "flowbite-react";
import { faEnvelopeCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const RegisterModal = ({ setRedirect, showToast, firstNameRef }) => {
  return (
    <Modal
      className="backdrop-blur-sm"
      show={showToast}
      onClose={() => setRedirect(true)}
    >
      <Modal.Header className="text-3xl text-center bg-black ">
        <p className="text-white text-center ">Sing up completed</p>
      </Modal.Header>
      <Modal.Body className="bg-withe text-center">
        <div className="space-y-6">
          <FontAwesomeIcon
            icon={faEnvelopeCircleCheck}
            className="text-green-500 text-4xl"
          />

          <p className="text-base leading-relaxed text-black dark:text-gray-400">
            "Congratulations!{" "}
            <span className="text-green-600">
              {firstNameRef?.current?.value}
            </span>{" "}
            Your registration was successful. To complete the registration
            process, please check your email inbox for a confirmation email from
            us. Click on the confirmation link in the email to verify your email
            address and activate your account."
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer className="bg-withe flex justify-center">
        <Button color="dark" onClick={() => setRedirect(true)}>
          Login
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RegisterModal;
