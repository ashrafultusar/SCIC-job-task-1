import React from "react";
import { ScaleLoader } from 'react-spinners'
const LoadingSpinner = () => {
  return (
    <div>
      <div
        className={` ${smallHeight ? "h-[250px]" : "h-[70vh]"}
      flex 
      flex-col 
      justify-center  
      items-center `}
      >
        <ScaleLoader size={100} color="red" />
      </div>
    </div>
  );
};

export default LoadingSpinner;
