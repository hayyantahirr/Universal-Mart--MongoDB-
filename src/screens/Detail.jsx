import React, { useEffect, useState } from "react"; // We're using React to build our webpage, and we're bringing in some special tools (hooks) to help us with that.
import { useNavigate, useParams } from "react-router-dom"; // These tools help us move around the website and get the ID of the product we want to show.
import "../Styles/universal.css"; // This is like the clothing for our webpage; it makes things look nice.
import { doc, getDoc } from "firebase/firestore"; // These tools help us get the product details from a big list stored somewhere else (Firestore).
import { db } from "../config/firebase/firebaseconfig"; // We're telling our code where to find the big list of products.
import { useDispatch } from "react-redux"; // This tool helps us send messages to our cart so we can add items to it.
import { addToCart } from "../config/Redux/cartSlice"; // This is the message we send when we want to put something in the cart.
import axios from "axios";

const Detail = () => {
  const param = useParams(); // We're grabbing the product ID from the web address so we know which product to show.
  const navigate = useNavigate(); // This tool lets us go to different pages on our website.
  const [product, setProduct] = useState(null); // We're creating a special box to hold the product details once we get them.
  const [loading, setLoading] = useState(true); // Another box to keep track of whether we're still waiting for the product details.
  const dispatch = useDispatch(); // This is our way of sending the "add to cart" message.

  // This is our back button function; it will take us to the previous page we were on.
  function back() {
    navigate(-1); // Go back one step to the page we came from.
  }

  // This is our fetch data function; it will go and grab the product details from our big list in Firestore.
  async function getDataThroughId() {
    try {
      await axios(`https://universalmartapi.vercel.app/products/`).then(
        (res) => {
          const foundProduct = res.data.data.find(
            (item) => item._id === param.id
          );
          console.log(foundProduct);
          setProduct(foundProduct); // We're putting the details into our special product box.
        }
      );

      setLoading(false); // We're done waiting for the product details, so we stop the loading spinner.
    } catch (e) {
      console.log(e); // If something goes wrong, we let ourselves know what the problem is.
      setLoading(false); // Even if there's a problem, we stop the loading spinner.
    }
  }

  // When our webpage first shows up, or if the product ID changes, we fetch the product details.
  useEffect(() => {
    getDataThroughId();
  }, [param.id]);

  // If we're still waiting for the product details, show a loading spinner.
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  // Once we have the product details, we show them on the webpage.
  return (
    <>
      {product ? (
        // We're showing the product details like the image, title, price, brand, and category.
        <div className="mt-7 mb-8">
          <div className="flex flex-col lg:flex-row flex-wrap justify-center gap-5">
            <div className="w-full lg:w-1/5 flex justify-center">
              <img
                src={product.img}
                alt={product.title}
                className="w-4/5 lg:w-full border rounded-3xl"
              />
            </div>
            <div className="w-full lg:w-1/2 border text-center rounded-3xl p-4">
              <h1 className="mt-5 text-2xl">{product.title}</h1>
              <div className="text-left lg:text-center">
                <h1 className="text-xl">
                  Price:{" "}
                  <span className="text-[#a6adad] text-base">
                    {product.price}$
                  </span>
                </h1>
                <h1 className="text-xl">
                  Brand:{" "}
                  <span className="text-[#a6adad] text-base">
                    {product.brand}
                  </span>
                </h1>
                <h1 className="text-xl">
                  Category:{" "}
                  <span className="text-[#a6adad] text-base">
                    {product.category}
                  </span>
                </h1>
                <div className="mt-4 mb-5">
                  <h1 className="text-wrap">{product.description}</h1>
                </div>
                <div className="w-full lg:w-1/3 mx-auto mt-4 mb-5">
                  {/* This button adds the product to our cart. */}
                  <button
                    className="relative group cursor-pointer text-sky-50 overflow-hidden h-16 w-full lg:w-64 rounded-md bg-sky-800 p-2 flex justify-center items-center font-bold"
                    onClick={() => dispatch(addToCart(product))}
                  >
                    <div className="absolute top-3 right-20 group-hover:top-12 group-hover:-right-12 z-10 w-40 h-40 rounded-full group-hover:scale-150 group-hover:opacity-50 duration-500 bg-sky-900"></div>
                    <div className="absolute top-3 right-20 group-hover:top-12 group-hover:-right-12 z-10 w-32 h-32 rounded-full group-hover:scale-150 group-hover:opacity-50 duration-500 bg-sky-800"></div>
                    <div className="absolute top-3 right-20 group-hover:top-12 group-hover:-right-12 z-10 w-24 h-24 rounded-full group-hover:scale-150 group-hover:opacity-50 duration-500 bg-sky-700"></div>
                    <div className="absolute top-3 right-20 group-hover:top-12 group-hover:-right-12 z-10 w-14 h-14 rounded-full group-hover:scale-150 group-hover:opacity-50 duration-500 bg-sky-600"></div>
                    <p className="z-10">
                      <span className="flex AddToCart items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="size-5 mr-3"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6 5v1H4.667a1.75 1.75 0 0 0-1.743 1.598l-.826 9.5A1.75 1.75 0 0 0 3.84 19H16.16a1.75 1.75 0 0 0 1.743-1.902l-.826-9.5A1.75 1.75 0 0 0 15.333 6H14V5a4 4 0 0 0-8 0Zm4-2.5A2.5 2.5 0 0 0 7.5 5v1h5V5A2.5 2.5 0 0 0 10 2.5ZM7.5 10a2.5 2.5 0 0 0 5 0V8.75a.75.75 0 0 1 1.5 0V10a4 4 0 0 1-8 0V8.75a.75.75 0 0 1 1.5 0V10Z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Add to cart
                      </span>
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-7">
            {/* This button takes us back to the home page. */}
            <button className="btn btn-outline btn-primary" onClick={back}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
                />
              </svg>
              Go Back to Home
            </button>
          </div>
        </div>
      ) : (
        // If there's no product details, we keep showing the loading spinner.
        <div className="flex items-center justify-center min-h-screen">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      )}
    </>
  );
};
export default Detail;

// ### Simple Explanation:
// 1. **Imports**: We start by bringing in tools to help us with different tasks like building the webpage, moving around, getting product details, and adding items to the cart.
// 2. **State and Functions**: We create boxes to hold the product details and a loading state. We also have functions to go back to the previous page and to fetch product data.
// 3. **Fetching Product Data**: We grab the product details from Firestore using the product ID from the web address and put them in our product box.
// 4. **Rendering the Page**: If we're still getting the product details, we show a loading spinner. Once we have the details, we display them with options to add the product to the cart or go back to the home page.
