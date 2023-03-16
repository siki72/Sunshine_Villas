import {
  faCircleCheck,
  faFileCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Modal from "react-awesome-modal";

const [visible, setVisible] = useState(false);
let openModal = () => {
  setVisible(true);
};

let closeModal = () => {
  setVisible(false);
};

const popUptest = ({ setopen }) => {
  return (
    <Modal
      visible={visible}
      width="500"
      height="300"
      effect="fadeIn"
      onClickAway={() => closeModal()}
    >
      <h2>
        Thanks <span></span>{" "}
      </h2>

      <div>
        <span>
          <FontAwesomeIcon className="icons" icon={faCircleCheck} />{" "}
        </span>
        <span>
          Your booking at <em>sunshine villas</em> is confirmer.
        </span>
      </div>
      <div>
        <span>
          <FontAwesomeIcon className="icons" icon={faFileCircleCheck} />{" "}
        </span>
        <span>
          <em>Sunshine villas</em> all our staff is delighted to receive you :
        </span>
      </div>

      <div>
        <span>
          <FontAwesomeIcon className="icons" icon={faCircleCheck} />{" "}
        </span>
        <span>
          Your <em>payement</em> will be handled directly in the reception
        </span>
      </div>
    </Modal>
  );
};

export default popUptest;
