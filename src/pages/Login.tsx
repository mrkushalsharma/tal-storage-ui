/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AccountService } from "../services/api-services";
import apiService from "../hooks/apiService";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { handleRequest, isLoading } = apiService();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    handleRequest(
      AccountService.postApiAccountLogin({
        email,
        password,
      })
    ).then((response) => {
      if (response.success) {
        toast.success("User Logged in Successfully.");
        localStorage.setItem("token", response?.data?.token);
        navigate("/");
      }
    });
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="row w-100">
        <div className="col-sm-10 col-md-8 col-lg-5 mx-auto">
          <div className="card shadow-lg border-0 rounded-lg my-5">
            <div className="card-body p-4">
              <h3 className="card-title text-center mb-4">Sign In</h3>
              <form onSubmit={handleSubmit} className="form-signin">
                <div className="mb-3">
                  <label htmlFor="inputEmail" className="form-label">
                    Email *
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="inputEmail"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="inputPassword" className="form-label">
                    Password *
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="inputPassword"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="d-grid">
                  <button
                    id="submitButton"
                    className="btn btn-primary btn-lg text-uppercase"
                    type="submit"
                  >
                    {isLoading ? "Signing In..." : "Sign In"}
                  </button>
                  <button
                    id="registerButton"
                    className="btn btn-success btn-lg text-uppercase mt-3"
                    type="button"
                    onClick={() => navigate("/register")}
                  >
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
