import React, { useEffect, useRef } from "react";
import ModelViewer from "@metamask/logo";
// To render with fixed dimensions:

const Fox = () => {
  const cont = useRef(null);

  useEffect(() => {
    let viewer = ModelViewer({
      pxNotRatio: true,
      width: 100,
      height: 100,
      followMouse: true,
      slowDrift: false
    });
    // add viewer to DOM
    let container = cont.current;
    container.appendChild(viewer.container);

    viewer.lookAt({
      x: 50,
      y: 50
    });

    // enable mouse follow
    viewer.setFollowMouse(true);

    // deallocate nicely
    return function cleanup() {
      viewer.stopAnimation();
      container.removeChild(viewer.container);
    };
  }, []);

  return <div ref={cont} id="logo-container"></div>;
};
export default Fox;
