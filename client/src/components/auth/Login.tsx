import { useState } from "react";
import { HiMiniKey, HiMiniUser } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { login } from "../../store/auth/authSlice";
import axios from "axios";

type LoginProps = {
  isOpen: boolean;
  closeModal: () => void;
  openRegisterModal: () => void;
};

const graphqlEndpoint =
  process.env.NODE_ENV === "production"
    ? "https://staystrong.vercel.app/graphql"
    : "http://localhost:3000/graphql";

const Login = ({ isOpen, closeModal, openRegisterModal }: LoginProps) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const clearForm = () => {
    setUsername("");
    setPassword("");
    setError(null);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    setTimeout(async () => {
      const requestBody = {
        query: `
          query {
            login(username: "${username}", password: "${password}") {
              token
            }
          }
        `,
      };

      try {
        const response = await axios.post(graphqlEndpoint, requestBody, {
          headers: { "Content-Type": "application/json" },
        });

        const result = response.data;

        if (result.errors) {
          setError(result.errors[0]?.message || "Something went wrong.");
        } else {
          if (result.data?.login?.token) {
            const { token } = result.data.login;
            localStorage.setItem("token", token);
            dispatch(login({ token }));
            closeModal();
            clearForm();
          } else {
            setError("Unexpected error: No token received.");
          }
        }
      } catch (err) {
        setError("Wrong Credentials, try again");
      } finally {
        setLoading(false);
      }
    }, 2000);
  };

  return (
    <>
      {isOpen && (
        <dialog id="login_modal" className="modal modal-open">
          <div className="modal-box w-auto max-w-5xl flex flex-col gap-2">
            <h3 className="font-bold text-xl">Login</h3>
            <p>You need to login to start!</p>
            <div className="modal-action">
              <form
                method="dialog"
                className="flex flex-col gap-4"
                onSubmit={handleLogin}
              >
                <label
                  htmlFor="username"
                  className="input input-bordered flex items-center gap-2"
                >
                  <HiMiniUser size={20} />
                  <input
                    type="text"
                    className="grow"
                    placeholder="Username"
                    id="username"
                    autoComplete="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </label>
                <label
                  htmlFor="password"
                  className="input input-bordered flex items-center gap-2"
                >
                  <HiMiniKey size={20} />
                  <input
                    type="password"
                    className="grow"
                    placeholder="Password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </label>
                {error && <div className="text-xs text-error">{error}</div>}
                <span className="text-xs mt-2 flex gap-1">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={openRegisterModal}
                    className="link link-primary"
                  >
                    Register now
                  </button>
                </span>
                <div className="mt-5 flex justify-between">
                  <button
                    type="submit"
                    className="btn btn-outline btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Continue"}
                  </button>
                  <button className="btn" onClick={closeModal}>
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default Login;
