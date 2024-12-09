import { useState, useEffect } from "react";
import Login from "./Login";
import Register from "./Register";
import { useNavigate } from "react-router-dom";

//Protected Route Modal, when visit a place without login, there will come a Modal.

interface RouteProps {
  defaultOpen: "login" | "register";
}

const RouteModal = ({ defaultOpen }: RouteProps) => {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (defaultOpen === "login") {
      setLoginOpen(true);
      setRegisterOpen(false);
    } else if (defaultOpen === "register") {
      setLoginOpen(false);
      setRegisterOpen(true);
    }
  }, [defaultOpen]);

  const closeLoginModal = () => {
    setLoginOpen(false);
    navigate("/");
  };
  const closeRegisterModal = () => {
    setRegisterOpen(false);
    navigate("/");
  };

  const openRegisterModal = () => {
    setRegisterOpen(true);
    setLoginOpen(false);
  };

  const openLoginModal = () => {
    setLoginOpen(true);
    setRegisterOpen(false);
  };

  return (
    <div>
      <Login
        isOpen={isLoginOpen}
        closeModal={closeLoginModal}
        openRegisterModal={openRegisterModal}
      />
      <Register
        isOpen={isRegisterOpen}
        closeModal={closeRegisterModal}
        openLoginModal={openLoginModal}
      />
    </div>
  );
};

export default RouteModal;
