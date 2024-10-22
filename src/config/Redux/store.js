import { configureStore } from "@reduxjs/toolkit"; // We're bringing in a special tool that helps us create a big box (store) to keep all our important things (state) together.
import persistReducer from "redux-persist/es/persistReducer"; // This is a helper that will make sure our big box remembers everything, even when we close the app.
import storage from "redux-persist/lib/storage"; // This is like a drawer where we keep the memories of our big box (it usually uses localStorage on the computer).
import persistStore from "redux-persist/es/persistStore"; // This is another helper that works with the drawer to keep everything in place and safe.
import cartReducer from "./cartSlice";
const persistConfig = {
  key: "root", // We're naming our drawer's key as "root." This key is like the name on the drawer.
  storage, // We're telling the drawer to use localStorage to save our things.
};

const persistedReducer = persistReducer(persistConfig, cartReducer); // We're wrapping our cart in a special blanket (persistReducer) so that it stays safe and remembered in the drawer (localStorage). <===== This is the point in which we are saving our data in the localStorage.

const store = configureStore({
  reducer: { persistedReducer }, // We're creating our big box (store) and putting the wrapped cart inside it.
});

const persistor = persistStore(store); // We're creating a helper (persistor) that will help our big box remember everything inside it, even when we close and open it again.

export { store, persistor }; // Finally, we're sharing our big box (store) and helper (persistor) so the whole app can use them.

// ### Detailed Explanation (Like Explaining to a 5-Year-Old)

// 1. **Setting Up the Big Box (Store)**
//    - Imagine you have a big toy box where you keep all your favorite toys. This box is really smart—it can remember all the toys you put inside, even if you leave the room and come back later. The `configureStore` is like a special tool that helps us build this big toy box.

// 2. **Making the Box Remember Things (PersistReducer)**
//    - Now, we want to make sure our toy box doesn’t forget the toys when we close it. To do this, we wrap the toys in a special blanket called `persistReducer`. This blanket is magical—it makes sure the toys stay in the box, no matter what.

// 3. **Storing the Memories (Storage)**
//    - But where do we keep this magical blanket? We need a drawer to keep it safe. Here, the drawer is called `storage`, and it’s usually inside the computer. The blanket goes into the drawer, and whenever we open the toy box again, the blanket is there to remind us of the toys.

// 4. **Special Name for the Drawer (Key)**
//    - We give our drawer a special name, “root,” so we always know which drawer to look in when we need our blanket.

// 5. **Helper to Keep Things Safe (PersistStore)**
//    - We also create a helper (persistor) who always checks to make sure everything in the box is safe and remembers to keep everything in order. This helper works with the blanket and the drawer.

// 6. **Sharing the Box and Helper (Export)**
//    - Finally, we share our big toy box and the helper with everyone in our app, so that every part of the app can add toys to the box or take them out, and the helper will always make sure nothing is forgotten.

// ### Conclusion

// This code is all about creating a place to store important information (like toys in a toy box) and making sure it stays safe and remembered, even if we close the app or refresh the page. 
// The combination of `configureStore`, `persistReducer`, and `persistStore` ensures that the information is never lost.Let's go through your code step by step.