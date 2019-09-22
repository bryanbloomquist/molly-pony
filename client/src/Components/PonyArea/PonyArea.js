import React from "react";

const PonyArea = ( props ) => {
  return (
    <div className = "ponyArea p-2">
      { props.children }
    </div>
  );
}

export default PonyArea;