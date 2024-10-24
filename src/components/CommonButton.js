import Image from "next/image";
import React from "react";

const CommonButton = ({ text, width, onClick, image }) => {
  return (
    <div>
      <button
        className="btn btn-primary d-flex align-items-center justify-content-center gap-2"
        style={{ width: width }}
        onClick={onClick}
      >
        {image ? <div>{image && <Image src={image} alt="" loading="lazy"/>}</div> : ""}
        {text}
      </button>
    </div>
  );
};

export default CommonButton;
