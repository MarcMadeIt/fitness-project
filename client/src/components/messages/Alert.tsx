import { useState, useEffect } from "react";
import { HiOutlineCheckCircle } from "react-icons/hi2";

type AlertProps = {
  message: string;
  onClose: () => void;
};

const Alert = ({ message, onClose }: AlertProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!visible) return null;

  return (
    <div
      role="alert"
      className="alert flex items-center gap-2 absolute top-3 left-1/2 transform -translate-x-1/2 p-4 z-10 w-[92%] md:w-1/2 lg:w-1/3"
      onClick={() => setVisible(false)}
    >
      <span className="text-primary">
        <HiOutlineCheckCircle size={28} />
      </span>
      <span>{message}</span>
    </div>
  );
};

export default Alert;
