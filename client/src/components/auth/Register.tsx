import { useState } from "react";
import { HiMiniKey, HiMiniUser, HiShieldCheck } from "react-icons/hi2";
import Alert from "../messages/Alert";
import axios from "axios";

type RegisterProps = {
  isOpen: boolean;
  closeModal: () => void;
  openLoginModal: () => void;
};

const graphqlEndpoint =
  process.env.NODE_ENV === "production"
    ? "https://staystrong.vercel.app/graphql"
    : "http://localhost:3000/graphql";

const Register = ({ isOpen, closeModal, openLoginModal }: RegisterProps) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const clearForm = () => {
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setPasswordsMatch(true);
    setError(null);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordsMatch(false);
      return;
    }

    setLoading(true);
    setError(null);
    setPasswordsMatch(true);

    try {
      const response = await axios.post(
        graphqlEndpoint,
        {
          query: `
          mutation {
            createUser(userInput: { username: "${username}", password: "${password}" }) {
              _id
              username
            }
          }
        `,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("GraphQL Endpoint:", graphqlEndpoint);

      const result = response.data;

      if (response.status === 200 && !result.errors) {
        console.log("User created:", result);
        closeModal();
        clearForm();
        setAlertMessage("User created successfully!");
      } else {
        const errorMessage =
          result.errors?.[0]?.message || "Something went wrong.";
        setError(errorMessage);
      }
    } catch (err) {
      setError("Server error: Unable to create user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {alertMessage && (
        <Alert message={alertMessage} onClose={() => setAlertMessage(null)} />
      )}

      {isOpen && (
        <dialog id="register_modal" className="modal modal-open">
          <div className="modal-box w-auto max-w-5xl">
            <h3 className="font-bold text-lg">Register</h3>
            <p className="py-4">Create user to get started!</p>
            <div className="modal-action">
              <form
                method="dialog"
                className="flex flex-col gap-4"
                onSubmit={handleRegister}
              >
                <label
                  htmlFor="username"
                  className="input input-bordered flex items-center gap-2"
                >
                  <HiMiniUser size={20} />
                  <input
                    type="text"
                    className="grow"
                    placeholder="New Username"
                    id="username"
                    autoComplete="username"
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
                    placeholder="New Password"
                    id="password"
                    value={password}
                    autoComplete="new-password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </label>
                <label
                  htmlFor="confirmPassword"
                  className="input input-bordered flex items-center gap-2"
                >
                  <HiShieldCheck size={20} />
                  <input
                    type="password"
                    className="grow"
                    placeholder="Confirm password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                  />
                </label>
                {!passwordsMatch && (
                  <div className="text-xs text-error">
                    Passwords do not match
                  </div>
                )}
                {error && <div className="text-xs text-error">{error}</div>}
                <span className="text-xs mt-2 flex gap-1">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={openLoginModal}
                    className="link link-primary"
                  >
                    Login
                  </button>
                </span>
                <div className="mt-5 flex justify-between">
                  <button
                    type="submit"
                    className="btn btn-outline btn-primary"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <span>Creating...</span>
                        <span className="loading loading-xs loading-spinner text-primary"></span>
                      </div>
                    ) : (
                      "Create User"
                    )}
                  </button>
                  <button
                    className="btn"
                    onClick={() => {
                      closeModal();
                      clearForm();
                    }}
                  >
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

export default Register;
