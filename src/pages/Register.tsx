import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../hooks/apiService";
import { AccountService } from "../services/api-services";
import { toast } from "react-toastify";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { handleRequest, isLoading } = apiService();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    handleRequest(
      AccountService.postApiAccountRegister({
        fullName,
        email,
        password,
      })
    )
      .then((response) => {
        if(response.success){
            toast.success("User Registered Successfully.");
            navigate("/login");
        }
      })
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="row w-100">
        <div className="col-sm-10 col-md-8 col-lg-5 mx-auto">
          <div className="card shadow-lg border-0 rounded-lg my-5">
            <div className="card-body p-4">
              <h3 className="card-title text-center mb-4">Register</h3>
              <form onSubmit={handleSubmit} className="form-signin">
                <div className="mb-3">
                  <label htmlFor="inputFullName" className="form-label">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputFullName"
                    placeholder="Enter Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
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
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="d-grid">
                  <button
                    id="submitButton"
                    className="btn btn-primary btn-lg text-uppercase"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? "Registering..." : "Register"}
                  </button>
                  <button
                    id="loginButton"
                    className="btn btn-success btn-lg text-uppercase mt-3"
                    type="button"
                    onClick={() => navigate("/login")}
                  >
                    Sign In
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

export default Register;
