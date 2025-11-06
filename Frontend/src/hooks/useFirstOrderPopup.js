import { useEffect, useState } from "react";

const useFirstOrderPopup = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // ----> change key if you want to reset for testing
    const claimed = localStorage.getItem("firstOrderPopupSeen");

    if (!claimed) {
      const timer = setTimeout(() => {
        setOpen(true);
      }, 5000); // 5 seconds

      return () => clearTimeout(timer);
    }
  }, []);

  const close = () => {
    setOpen(false);
    localStorage.setItem("firstOrderPopupSeen", "true");
  };

  return { open, close };
};

export default useFirstOrderPopup;