import { createSlice } from "@reduxjs/toolkit"; // Importing the 'createSlice' function from Redux Toolkit

// Initial state of the cart, which is an empty array
const initialState = {
  cart: [], // The 'cart' array will hold all items added to the cart
};

// Creating a slice of the Redux store for the cart
export const cartSlice = createSlice({
  name: "cart", // The name of this slice of state, in this case, 'cart'
  initialState, // Setting the initial state to our defined 'initialState'
  reducers: {
    // Reducer function to handle adding items to the cart
    addToCart: (state, data) => {
      console.log("Data ===>", data); // Log the incoming data for debugging
      // If the cart already has items
      if (state.cart.length > 0) {
        // Check if the item to be added already exists in the cart
        let itemExist = state.cart.find((item) => item.id === data.payload.id);
        if (itemExist) {
          // If the item exists, just increase the quantity of that item
          itemExist.quantity += data.payload.quantity;
        } else {
          // If the item doesn't exist, set the quantity to 1 and add the item to the cart
          data.payload.quantity = 1;
          state.cart.push(data.payload); // Push the new item into the cart array
        }
      } else {
        // If the cart is empty, add the item with a quantity of 1
        data.payload.quantity = 1;
        state.cart.push(data.payload); // Push the new item into the cart array
      }
    },
    // Reducer function to handle incrementing the quantity of an item in the cart
    increment: (state, action) => {
      // Find the index of the item in the cart
      const index = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      // If the item is found in the cart, increment its quantity by 1
      if (index !== -1) {
        state.cart[index].quantity += 1;
      }
    },
    // Reducer function to handle decrementing the quantity of an item in the cart
    decrement: (state, action) => {
      // Find the index of the item in the cart
      const index = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      // If the item is found and its quantity is greater than 1, decrease the quantity by 1
      if (index !== -1 && state.cart[index].quantity > 1) {
        state.cart[index].quantity -= 1;
      } else if (index !== -1 && state.cart[index].quantity === 1) {
        // If the item quantity is 1 and we want to decrement, remove the item from the cart

        state.cart.splice(index, 1);
        
        
      }
    },
    // Reducer function to handle removing an item entirely from the cart
    removeFromCart: (state, data) => {
      // Filter out the item with the matching ID, effectively removing it from the cart
      state.cart = state.cart.filter((item) => item.id !== data.payload.id);
    },
  },
});

// Action creators are generated for each reducer function automatically
export const { addToCart, removeFromCart, increment, decrement } =
  cartSlice.actions; // Export the action creators

export default cartSlice.reducer; // Export the reducer to be used in the store configuration

// ### Detailed Explanation of the Code (Explained Like You Are 5)

// 1. **`createSlice` Function**:
//    - Imagine you have a big box with different compartments, and each compartment holds something important. Here, we're creating a special compartment called "cart" using `createSlice`. This compartment will help us manage everything that happens to your shopping cart, like adding, removing, or changing the number of items.

// 2. **Initial State (`initialState`)**:
//    - The initial state is like an empty shopping cart when you first enter a store. It starts with nothing inside (`cart: []`).

// 3. **`reducers`**:
//    - These are the different things you can do with the items in your cart, like adding an item, removing an item, or changing how many of something you have.

//    - **`addToCart` Function**:
//      - Imagine you pick up a toy and want to add it to your cart. The `addToCart` function checks if you already have that toy in your cart. If you do, it increases the number of that toy by one. If not, it adds the toy to your cart.

//    - **`increment` Function**:
//      - This is like going back to the shelf and picking up one more of the same toy. The `increment` function finds the toy in your cart and adds one more to the count.

//    - **`decrement` Function**:
//      - This is like deciding you don’t need one of the toys, so you put one back. The `decrement` function finds the toy in your cart and takes one away. If you only have one of that toy left and you decide to take it away, the toy is completely removed from your cart.

//    - **`removeFromCart` Function**:
//      - This is like changing your mind about a toy entirely and putting it back on the shelf. The `removeFromCart` function finds the toy in your cart and removes it completely.

// 4. **Action Creators**:
//    - Action creators are like instructions you give to the store. For example, you might say, "I want to add this toy to my cart." The action creators (`addToCart`, `removeFromCart`, `increment`, `decrement`) are the instructions that make things happen.

// 5. **Exporting**:
//    - Finally, we're packaging up everything we've made so it can be used in other parts of your app. We export the `cartSlice.reducer` so it can be added to the main box (Redux store) that manages the whole app.

// This setup makes it easy to control what happens to the items in your shopping cart, whether you're adding new toys, changing how many you have, or putting some back on the shelf.
