import { useEffect } from "react";

export const useKeyPress = (targetKey: any, handler: any) => {
  const downHandler = ({ key }) => {
    if (key === targetKey) {
      handler();
    }
  };

  useEffect(() => {
    window.addEventListener("keyup", downHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keyup", downHandler);
    };
  });
};
