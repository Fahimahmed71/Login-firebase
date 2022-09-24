import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GoogleSignIn = () => {
  const [signInWithGoogle, user, error] = useSignInWithGoogle(auth);

  const navigate = useNavigate();

  if (user) {
    navigate("/home");
  }

  if (error) {
    return (
      <div>
        <p className="text-red-500 text-center mt-5">Error {error.message}</p>
      </div>
    );
  }

  return (
    <div>
      <FcGoogle
        onClick={() => signInWithGoogle()}
        className="cursor-pointer text-2xl block mx-auto mt-5"
      />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default GoogleSignIn;
