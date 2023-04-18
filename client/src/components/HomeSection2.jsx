import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CardVilla from "./CardVilla";

const HomeSection2 = () => {
  const dispatch = useDispatch(); // fait tout et a la fin incremonte le store
  const data = useSelector((state) => state.threeCards.cards); // ramener la data depuis le store

  return (
    <section className="section_2">
      <div className="main_select">
        <h2>Select your dream space</h2>
        <div className="villas-cards">
          {!data ? (
            <div className="cards_skeleton">
              <div class="mx-auto bg-white  shadow-lg w-96 rounded-2xl">
                <div class="h-80 p-3 overflow-hidden bg-gray-200 animate-pulse"></div>
                <div class="p-3 h-">
                  <div class="grid grid-cols-3 gap-4 mt-2">
                    <div class="h-8 bg-gray-200 rounded animate-pulse"></div>
                    <div class="h-8 bg-gray-200 rounded animate-pulse"></div>
                    <div class="h-8 bg-gray-200 rounded animate-pulse"></div>
                    <div class="h-8 col-span-3 bg-gray-200 rounded animate-pulse"></div>
                    <div class="h-8 col-span-3 bg-gray-200 rounded animate-pulse"></div>
                    <div class="h-8 col-span-3 bg-gray-200 rounded animate-pulse"></div>
                    <div class="..."></div>
                    <div class="col-span-2 ..."></div>
                  </div>
                </div>
              </div>
              <div className="mx-auto bg-white  shadow-lg w-96 rounded-2xl">
                <div class="h-80 p-3 overflow-hidden bg-gray-200 animate-pulse"></div>
                <div class="p-3 h-">
                  <div class="grid grid-cols-3 gap-4 mt-2">
                    <div class="h-8 bg-gray-200 rounded animate-pulse"></div>
                    <div class="h-8 bg-gray-200 rounded animate-pulse"></div>
                    <div class="h-8 bg-gray-200 rounded animate-pulse"></div>
                    <div class="h-8 col-span-3 bg-gray-200 rounded animate-pulse"></div>
                    <div class="h-8 col-span-3 bg-gray-200 rounded animate-pulse"></div>
                    <div class="h-8 col-span-3 bg-gray-200 rounded animate-pulse"></div>
                    <div class="..."></div>
                    <div class="col-span-2 ..."></div>
                  </div>
                </div>
              </div>

              <div class="mx-auto bg-white  shadow-lg w-96 rounded-2xl">
                <div class="h-80 p-3 overflow-hidden bg-gray-200 animate-pulse"></div>
                <div class="p-3 h-">
                  <div class="grid grid-cols-3 gap-4 mt-2">
                    <div class="h-8 bg-gray-200 rounded animate-pulse"></div>
                    <div class="h-8 bg-gray-200 rounded animate-pulse"></div>
                    <div class="h-8 bg-gray-200 rounded animate-pulse"></div>
                    <div class="h-8 col-span-3 bg-gray-200 rounded animate-pulse"></div>
                    <div class="h-8 col-span-3 bg-gray-200 rounded animate-pulse"></div>
                    <div class="h-8 col-span-3 bg-gray-200 rounded animate-pulse"></div>
                    <div class="..."></div>
                    <div class="col-span-2 ..."></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            data.map((card) => <CardVilla key={card.id} card={card} />)
          )}
        </div>
      </div>
    </section>
  );
};

export default HomeSection2;
