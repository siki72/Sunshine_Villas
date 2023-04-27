import React from "react";
import { Modal, Button } from "flowbite-react";
const RegisterModal = ({ setRedirect, showToast }) => {
  return (
    <Modal
      className="backdrop-blur-sm"
      show={showToast}
      onClose={() => setRedirect(true)}
    >
      <Modal.Header className=" text-white text-3xl text-center bg-withe ">
        Thank You{" "}
        <span className="text-green-500 first-letter:text-xl ">
          {/*  {user?.name.toUpperCase()} */}
        </span>
      </Modal.Header>
      <Modal.Body className="bg-black">
        <div className="space-y-6">
          <p className="text-base leading-relaxed text-white dark:text-gray-400">
            Your booking at Sunshine Villas is{" "}
            <span className="text-green-400">confirmer</span> .
          </p>
          <p className="text-base leading-relaxed text-white dark:text-gray-400">
            Congratulations! Your registration was successful. You can now go
            ahead and log in to your account."
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer className="bg-black flex justify-center">
        <Button color="success" onClick={() => setRedirect(true)}>
          Done
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RegisterModal;
