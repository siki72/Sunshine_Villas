import React from "react";

const ReviewsCards = ({ comment }) => {
  return (
    <>
      <h4>{comment.name}</h4>
      <p>{comment.body}</p>
    </>
  );
};

export default ReviewsCards;
