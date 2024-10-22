import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Carousel = () => {
  const navigate = useNavigate();
  const [carouse, setCarouse] = useState([]);
  useEffect(() => {
    axios("https://dummyjson.com/products")
      .then((res) => {
        console.log(res.data.products);
        setCarouse(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function click() {
    navigate(`/detail/${id}`);
  }

  return (
    <>
      <div className="carousel carousel-vertical rounded-box h-96">
        {carouse.map((item) => {
          return (
            <div className="carousel-item h-full" onClick={click}>
              <img src={item.thumbnail} className="rounded-box" />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Carousel;
//
