import React from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { signOut } from "firebase/auth";

const Home = () => {
  const [user] = useAuthState(auth);

  const logout = () => {
    signOut(auth);
  };

  return (
    <section className="bg-[#181818] w-screen h-screen relative">
      <h1 className="text-neutral-400 text-center text-4xl pt-5">
        Thanks For Login 🎉
      </h1>
      <dl className="container mx-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[30%] h-1/2 bg-[#212120] shadow-2xl shadow-neutral-900 p-10 rounded-lg">
        <img
          className="rounded-full w-20 h-20 ring-2 p-1 ring-pink-500 absolute top-[-15%] left-1/2 transform -translate-x-1/2"
          src={user?.photoURL}
          alt="img"
        />

        <div className="mt-10 text-neutral-400 font-medium">
          <h1>
            Name: <span className="text-pink-500">{user?.displayName}</span>
          </h1>
          <h1 className="mt-2">
            Email: <span className="text-pink-500">{user?.email}</span>
          </h1>

          <p className="text-center mt-5 leading-relaxed">
            This Website is made using React & Firebase Auth
            <br />
            ありがとうございました ✨
          </p>

          <Link
            onClick={logout}
            to="/"
            className="block mx-auto mt-4 ring-2 ring-pink-500 w-1/2 text-center py-1 hover:text-white"
          >
            Sign Out
          </Link>
        </div>
      </dl>
    </section>
  );
};

export default Home;
