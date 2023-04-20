import React, { useState } from "react";
import { elements } from "../users/toursData.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Pagination, Carousel } from "flowbite-react";

const ExploreZanzibar = () => {
  const elementsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const numberOfPages = Math.ceil(elements.length / elementsPerPage);
  const startIndex = (currentPage - 1) * elementsPerPage;
  const endIndex = startIndex + elementsPerPage;
  const currentElements = elements.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
        <div className="carousel h-56 sm:h-64 xl:h-80 2xl:h-96">
          <Carousel>
            {elements.map((tour) => (
              <div
                key={tour.id}
                className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white"
              >
                <img src={tour.pic_url} alt={tour.title} />
              </div>
            ))}
          </Carousel>
        </div>
        {currentElements.map((tour) => (
          <article key={tour.id}>
            <figure>
              <img src={tour.pic_url} alt="" />
            </figure>
            <h3>{tour.title}</h3>
            <p>{tour.desc}</p>
          </article>
        ))}
      </main>
      <div className="pagination">
        <Pagination
          currentPage={currentPage}
          totalPages={numberOfPages}
          onPageChange={handlePageChange}
        />
      </div>
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

export default ExploreZanzibar;
