import React from "react";

const PonyArea = ( props ) => {
  return (
    <div className = "ponyArea m-0 p-0">
      { props.children }
    </div>
  );
}

export default PonyArea;