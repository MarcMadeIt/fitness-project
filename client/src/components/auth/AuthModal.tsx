import { useState } from "react";
import Login from "./Login";
import Register from "./Register";

const AuthModal = () => {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);

  const openLoginModal = () => {
    setLoginOpen(true);
    setRegisterOpen(false);
  };

  const closeLoginModal = () => {
    setLoginOpen(false);
  };

  const openRegisterModal = () => {
    setRegisterOpen(true);
    setLoginOpen(false);
  };

  const closeRegisterModal = () => setRegisterOpen(false);

  return (
    <div>
      <button className="btn" onClick={openLoginModal}>
        Login
      </button>

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

export default AuthModal;
