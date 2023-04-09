import React from "react";
import { elements } from "../users/toursData.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";

const Explore_zanzibar = () => {
  return (
    <div className="explore-zanzibar-container">
      <header
        className="header-container"
        aria-label="Sunshine hotels over--view with somme traditionnal wood boats on the sea"
        role="img"
      >
        <div className="header-content">
          <h1>Discover Zanzibar</h1>
          <h2>explore the island's wonders</h2>
        </div>
      </header>
      <main className="ours-tours">
        <p>
          Our hotel’s location makes it a perfect base to explore all the
          activities that Zanzibar has to offer.
        </p>
        {elements.map((tour) => (
          <article key={tour.id}>
            <figure>
              <img src={tour.pic_url} alt="" />
            </figure>
            <h3>{tour.title}</h3>
            <p>{tour.desc}</p>
          </article>
        ))}
      </main>
      <aside>
        <div className="staff">
          <div className="staff-avatar">
            <img src="../img/home/assistante.webp" alt="manager_pic" />
          </div>
          <div className="contacts">
            <p>
              Our activities manager will be more than happy to assist you in
              arranging your chosen excursions and in answering any questions
              you might have!
            </p>
            <h2>Alicia Missoum</h2>
            <a href="mailto:admin@admin.com">
              <FontAwesomeIcon icon={faEnvelope} />
              Alicia@sunshine.com
            </a>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Explore_zanzibar;
