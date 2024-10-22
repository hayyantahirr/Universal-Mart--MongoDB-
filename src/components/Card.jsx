import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "../Styles/universal.css";

const Card = ({ title, img, desc, id }) => {
  return (
    <>
      {/* Card layout with image, title, description, and link */}
      <div className="card bg-base-100 w-96 shadow-xl">
        <figure className="px-10 pt-10">
          <img src={img} alt="Product" className="rounded-xl h-[210px]" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{title}</h2>
          <p>{desc}....</p>

          <div className="card-actions">
            {/* Link for navigation */}
            <Link to={`/detail/${id}`} className="btn btn-primary">
              See more....
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
