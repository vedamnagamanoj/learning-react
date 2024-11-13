import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";

// import StarRating from "./StarRating";
// import "./StarRating.css";

import App from "./TextExpander";
import "./TextExpander.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// function Test() {
//   const [movieRating, setMovieRating] = useState(0);
//   return (
//     <>
//       <StarRating color="blue" onSetRating={setMovieRating} />
//       <p>This movie is rated {movieRating} stars</p>
//     </>
//   );
// }

// {
//   /* <App/> */
// }

// {
//   /* <StarRating
//       maxRating={5}
//       messages={["Terrible", "Bad", "Average", "Good", "Amazing"]}
//       defaultRating={3}
//     />

//     <StarRating
//       maxRating={10}
//       messages={["Terrible", "Bad", "Average", "Good", "Amazing"]}
//       color="red"
//       size={24}
//     />

//     <Test /> */
// }
