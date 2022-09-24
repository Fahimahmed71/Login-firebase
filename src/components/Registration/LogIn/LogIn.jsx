import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import GoogleSignIn from "../SocialSignIn/GoogleSignIn";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import { useRef } from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../RequiredAuth/Loading/Loading";

const LogIn = () => {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [sendPasswordResetEmail] = useSendPasswordResetEmail(auth);

  const [userLogin] = useAuthState(auth);

  // console.log(auth?.currentUser);

  const emailRef = useRef("");
  const passRef = useRef("");

  const navigate = useNavigate();

  const location = useLocation();
  let from = location.state?.from?.pathname || "/home";

  if (loading) {
    return <Loading />;
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const pass = passRef.current.value;

    if (!email || !pass) {
      toast("Cannot Set Empty");
      return;
    }

    await signInWithEmailAndPassword(email, pass);

    if (user) {
      navigate(from, { replace: true });
    } else {
      toast.error("Email Or Password Didn't Match");
    }
  };

  const reset = async () => {
    const email = emailRef.current.value;

    if (!email) {
      toast("Enter a email");
      return;
    } else {
      await sendPasswordResetEmail(email);
      toast.success("Check Email");
      navigate("/");
    }
  };

  return (
    <section className="bg-[#11163b] h-screen w-screen relative">
      <dl className="container mx-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-[#f23e79] text-3xl text-center ">
          {userLogin ? (
            <Link to="/home" className="text-emerald-500">
              {userLogin?.displayName} Logged In
            </Link>
          ) : (
            <div>Sign In</div>
          )}
        </h1>

        {error ? (
          <div className="text-center text-red-500">{error.message}</div>
        ) : (
          <GoogleSignIn />
        )}

        <div className=" flex justify-center mt-3">
          <form onSubmit={handleLogin}>
            <div className="flex flex-col">
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
              <label className="text-zinc-400 text-sm ">
                Password
                <button
                  onClick={reset}
                  className="float-right text-[#f23e79]  hover:text-pink-700 font-extralight"
                >
                  Forget Password?
                </button>
              </label>

              <input
                ref={passRef}
                className="bg-[#1b2252] border border-[#0f1436] focus:border-[#f23e79] focus:outline-none placeholder:italic  placeholder:text-slate-400 px-3 py-2 w-72 text-white rounded-md"
                type="Password"
                name="password"
                id="password"
                placeholder="Enter Password"
              />
            </div>

            <button
              type="submit"
              className="bg-[#f23e79] text-white w-72 mt-2 py-3 text-xl rounded-md hover:bg-pink-400"
            >
              Sign In
            </button>
          </form>
        </div>
      </dl>

      <dl className="absolute bottom-0">
        <div className="bg-[#191f4b] w-screen flex justify-center items-center gap-3 py-7">
          <h1 className="text-neutral-400">Don't have an account?</h1>
          <Link
            to="/signup"
            className="bg-[#f23e79] hover:bg-pink-400 text-white px-3 py-2 rounded-md"
          >
            Sign Up
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

export default LogIn;
