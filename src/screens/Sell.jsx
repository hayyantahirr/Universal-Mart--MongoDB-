import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"; // Firebase storage functions
import React, { useRef } from "react"; // React and useRef hook
import { useNavigate } from "react-router-dom"; // React Router navigation
import { db } from "../config/firebase/firebaseconfig"; // Firebase Firestore database
import { addDoc, collection } from "firebase/firestore"; // Firestore functions for adding documents
import "../Styles/universal.css"; // Universal CSS
import { Link } from "react-router-dom"; // Import Link for possible navigation within the component

function Sell() {
  // Refs for form inputs
  const img = useRef();
  const title = useRef();
  const price = useRef();
  const brand = useRef();
  const category = useRef();
  const description = useRef();

  const navigate = useNavigate(); // Hook for navigation
  const storage = getStorage(); // Get Firebase storage

  // Function to handle form submission
  async function sellProduct(event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Get image file and prepare storage reference
    const storageRef = ref(storage, "product/" + img.current.files[0].name);

    // Upload image to Firebase storage
    await uploadBytes(storageRef, img.current.files[0]);

    // Get the download URL of the uploaded image
    const url = await getDownloadURL(ref(storageRef));
    console.log(url);

    // Add product details to Firestore
    try {
      await fetch("https://universalmartapi.vercel.app/products/addProduct/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.current.value,
          img: url,
          price: price.current.value,
          brand: brand.current.value,
          category: category.current.value,
          description: description.current.value,
        }),
      })
        .then((res) => res.json())
        .then((res) => console.log(res));
      console.log("Product added successfully");
      navigate(-1); // Navigate back after successful submission
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    //
    // Logging all values for testing
    console.log(title.current.value);
    console.log(price.current.value);
    console.log(brand.current.value);
    console.log(category.current.value);
    console.log(description.current.value);
  }

  return (
    <>
      <form onSubmit={sellProduct}>
        <h1 className="text-center text-2xl mt-20">Sell a Product</h1>

        {/* Image input */}
        <label className="inp input input-bordered flex items-center gap-2 w-1/2 mx-auto mt-7">
          <input type="file" className="grow cursor-pointer" ref={img} />
        </label>

        {/* Title input */}
        <label className="inp input input-bordered flex items-center gap-2 w-1/2 mx-auto mt-7">
          <input
            type="text"
            placeholder="Title of Product"
            className="grow cursor-pointer"
            ref={title}
          />
        </label>

        {/* Price input */}
        <label className="inp input input-bordered flex items-center gap-2 w-1/2 mx-auto mt-7">
          <input
            type="number"
            placeholder="Price"
            className="grow cursor-pointer"
            ref={price}
          />
        </label>

        {/* Brand input */}
        <label className="inp input input-bordered flex items-center gap-2 w-1/2 mx-auto mt-7">
          <input
            type="text"
            placeholder="Brand"
            className="grow cursor-pointer"
            ref={brand}
          />
        </label>

        {/* Category input */}
        <label className="inp input input-bordered flex items-center gap-2 w-1/2 mx-auto mt-7">
          <input
            type="text"
            placeholder="Category"
            className="grow cursor-pointer"
            ref={category}
          />
        </label>

        {/* Description input */}
        <label className="inp input input-bordered flex items-center gap-2 w-1/2 mx-auto mt-7">
          <input
            type="text"
            placeholder="Description"
            className="grow cursor-pointer"
            ref={description}
          />
        </label>

        {/* Submit button */}
        <div className="flex justify-center">
          <button
            className="btn btn-outline btn-success mt-8 mb-5"
            type="submit"
          >
            Add it!{" "}
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
                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
              />
            </svg>
          </button>
        </div>
      </form>
    </>
  );
}

export default Sell;
