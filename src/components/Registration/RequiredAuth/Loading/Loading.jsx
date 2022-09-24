import React from "react";
import gif from "../../../../Img/giphy.gif";

const Loading = () => {
  return (
    <div>
      <img className="block mx-auto" src={gif} alt="" />
      <h1 className="text-6xl text-center font-bold mt-3 text-rose-600">
        Waiting
      </h1>
    </div>
  );
};

export default Loading;
