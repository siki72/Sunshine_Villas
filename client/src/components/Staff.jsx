import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Staff = () => {
  return (
    <div className="staff-contact-box">
      <div className="staff">
        <div className="staff-avatar">
          <img src="../img/home/manager.png" alt="manager_pic" />
        </div>
        <div className="contacts">
          <h3>Ali Missoum</h3>
          <a href="mailto:admin@admin.com">
            <FontAwesomeIcon icon={faEnvelope} />
            admin@admin.com
          </a>
          <div>
            <FontAwesomeIcon icon={faPhone} /> + 255 123 456 789
          </div>
        </div>
      </div>
      <div className="staff">
        <div className="staff-avatar">
          <img src="../img/home/assistante.jpg" alt="manager_pic" />
        </div>
        <div className="contacts">
          <h3>Alicia Missoum</h3>
          <a href="mailto:admin@admin.com">
            <FontAwesomeIcon icon={faEnvelope} />
            Alicia@sunshine.com
          </a>

          <div>
            <FontAwesomeIcon icon={faPhone} /> + 255 123 456 789
          </div>
        </div>
      </div>
    </div>
  );
};

export default Staff;
