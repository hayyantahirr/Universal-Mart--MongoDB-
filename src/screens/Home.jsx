import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app, db } from "../config/firebase/firebaseconfig";
import "../Styles/universal.css";
import { collection, getDocs, query } from "firebase/firestore";
import axios from "axios";

const Home = () => {
  const auth = getAuth(app); // Initialize Firebase Authentication
  const [product, setProduct] = useState(null); // State to hold product data
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [users, setUsers] = useState(); // State to hold user data

  // Effect to check user authentication status and redirect if not logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user.uid);
        setUsers(user);
      } else {
        console.log("please login first!");
        // Use Link for navigation is not appropriate here, as we need to redirect programmatically
        window.location.href = "/"; // Redirect to login page if not authenticated
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [auth]);

  // Function to fetch product data from Firestore
  async function gettingDocument() {
    // const q = query(collection(db, "product")); // Create a query to get all documents in "product" collection
    try {

     await axios("https://universalmartapi.vercel.app/products")
        .then((res) => {
          console.log(res.data.data);
          setProduct(res.data.data);
     })
     
       // Update product state with fetched data
      setLoading(false); // Set loading to false after data is fetched
      console.log(allDocs); // Log fetched data for debugging
    } catch (e) {
      console.log(e); // Log any error that occurs
      setLoading(false); // Set loading to false in case of error
    }
  }

  // Effect to fetch product data on component mount
  useEffect(() => {
    gettingDocument();
  }, []);

  // Show loading spinner while data is being fetched
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  return (
    <>
    
      {/* Welcome message displaying user's email */}
      <h1 className="text-2xl text-left ml-5">
        Welcome <span className="text-xl font-bold italic">{users?.email}</span>
        ,
      </h1>

      {/* Displaying fetched products in a card format */}
      <div className="flex gap-3 flex-wrap justify-center mb-5 items-center">
        {product ? (
          product.map((item) => {
            console.log(item);
            return (
              
                <Card
                  title={item.title} // Add key prop to each Card component
                  desc={item.description.slice(0, 50)} // Slice description to show only first 50 characters
                  img={item.img}
                  id={item._id}
                  price={item.price}
                  category={item.category}
                  brand={item.brand}
                />
             
            );
          })
        ) : (
          <span className="loading loading-dots loading-lg"></span>
        )}
      </div>
     
    </>
  );
};

export default Home;

// console.log(hello1)
