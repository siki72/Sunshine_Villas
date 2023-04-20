import React, { useContext } from "react";
import { Modal, Button } from "flowbite-react";
import { UserContext } from "../users/UserContext.jsx";
const BookingModal = ({ isReserved, setIsReserved }) => {
  const { user } = useContext(UserContext);
  function closeModal() {
    setIsReserved(false);
    window.location.reload(false);
  }
  return (
    <Modal className="backdrop-blur-sm" show={isReserved} onClose={closeModal}>
      <Modal.Header className=" text-white text-3xl text-center bg-neutral-300 ">
        Thanks{" "}
        <span className="text-green-400 first-letter:text-xl ">
          {user?.name.toUpperCase()}
        </span>
      </Modal.Header>
      <Modal.Body className="bg-black">
        <div className="space-y-6">
          <p className="text-base leading-relaxed text-white dark:text-gray-400">
            Your booking at Sunshine Villas is{" "}
            <span className="text-green-400">confirmer</span> .
          </p>
          <p className="text-base leading-relaxed text-white dark:text-gray-400">
            Sunshine Villas all our staff is delighted to receive you ! Your
            payement will be handled directly in the reception
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer className="bg-black flex justify-center">
        <Button color="success" onClick={closeModal}>
          Done
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BookingModal;
