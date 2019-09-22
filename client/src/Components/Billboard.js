import React from "react";

const Billboard = ( props ) => {
  return (
    <div className = "textboard p-2 m-2">
      <span className = "text-center">{ props.display }</span>
    </div>
  )
}

export default Billboard;