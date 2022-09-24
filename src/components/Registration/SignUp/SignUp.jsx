import React from "react";
import { Link } from "react-router-dom";
import GoogleSignIn from "../SocialSignIn/GoogleSignIn";
import {
  useCreateUserWithEmailAndPassword,
  useSendEmailVerification,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import { useRef } from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });

  const [sendEmailVerification] = useSendEmailVerification(auth);

  const [updateProfile] = useUpdateProfile(auth);

  const [agree, setAgree] = useState(false);

  const nameRef = useRef("");
  const emailRef = useRef("");
  const passRef = useRef("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const pass = passRef.current.value;

    await createUserWithEmailAndPassword(email, pass);

    await updateProfile({ displayName: name });

    if (sendEmailVerification) {
      toast.info("Check your Email 📧");
    }
    if (error) {
      toast.error("Something want wrong ⚠");
    }
    if (!name || !email || !pass) {
      toast("Cannot Set Empty");
    }
  };

  return (
    <section className="bg-[#11163b] h-screen w-screen relative">
      <dl className="container mx-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-[#f23e79] text-3xl text-center">Registration</h1>

        {error ? (
          <div className="text-red-500 text-center font-semibold">
            {error ? error.message : ""}
          </div>
        ) : (
          <GoogleSignIn />
        )}

        <div className=" flex justify-center mt-3">
          <form onSubmit={handleSignUp}>
            <div className="flex flex-col">
              <label className="text-zinc-400 text-sm">Name</label>
              <input
                ref={nameRef}
                className="bg-[#1b2252] border border-[#0f1436] focus:border-[#f23e79] focus:outline-none placeholder:italic  placeholder:text-slate-400 px-3 py-2 w-72 text-white rounded-md"
                type="text"
                name="name"
                id="name"
                placeholder="Enter a name"
              />
            </div>

            <div className="flex flex-col mt-2">
              <label className="text-zinc-400 text-sm">Email</label>
              <input
                ref={emailRef}
                className="bg-[#1b2252] border border-[#0f1436] focus:border-[#f23e79] focus:outline-none placeholder:italic  placeholder:text-slate-400 px-3 py-2 w-72 text-white rounded-md"
                type="email"
                name="email"
                id="email"
                placeholder="Enter a mail"
              />
            </div>

            <div className="flex flex-col mt-2">
              <label className="text-zinc-400 text-sm ">Password</label>

              <input
                ref={passRef}
                className="bg-[#1b2252] border border-[#0f1436] focus:border-[#f23e79] focus:outline-none placeholder:italic  placeholder:text-slate-400 px-3 py-2 w-72 text-white rounded-md"
                type="Password"
                name="password"
                id="password"
                placeholder="Enter Password"
              />
            </div>
            <div className="flex flex-col mt-3">
              <div className="text-fuchsia-300 flex flex-row items-center gap-2">
                <input
                  onClick={() => setAgree(!agree)}
                  type="checkbox"
                  id="check"
                />
                <label for="agree">Accept terms and conditions </label>
              </div>

              <button
                disabled={!agree}
                type="submit"
                className="bg-[#f23e79] text-white w-72 mt-2 py-3 text-xl rounded-md hover:bg-pink-400"
              >
                {agree ? "Sign Up" : "Accept Terms"}
              </button>
            </div>
          </form>
        </div>
      </dl>

      <dl className="absolute bottom-0">
        <div className="bg-[#191f4b] w-screen flex justify-center items-center gap-3 py-7">
          <h1 className="text-neutral-400">Already got an account?</h1>
          <Link
            to="/"
            className="bg-[#f23e79] hover:bg-pink-400 text-white px-3 py-2 rounded-md"
          >
            Sign In
          </Link>
        </div>
      </dl>
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
    </section>
  );
};

export default SignUp;
