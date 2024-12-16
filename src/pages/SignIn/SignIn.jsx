import Lottie from "lottie-react";
import React, { useContext } from "react";
import loginDataLottie from "../../assets/lottie/login.json";
import AuthContext from "../../Context/AuthContext";
import SocialAuth from "../shared/SocialAuth";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const { signInUser } = useContext(AuthContext);
  const location = useLocation();
  console.log("in signin", location);
  const from = location.state || "/";
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    signInUser(email, password)
      .then((result) => {
        console.log(result.user.email, "sign in");
        const user = { email: email };
        axios
          .post("http://localhost:3000/jwt", user, {
            withCredentials: true,
          })
          .then((res) => {
            console.log(res.data);
          });
        navigate(from);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left w-96">
          <Lottie animationData={loginDataLottie}></Lottie>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <h1 className="ml-8 mt-4 text-5xl font-bold">Sign in now!</h1>
          <form onSubmit={handleSignIn} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary text-xl font-semibold">
                Login
              </button>
              <div className="divider">Or</div>
              <div className="w-full">
                <SocialAuth></SocialAuth>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
