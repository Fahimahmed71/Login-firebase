import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./components/Home/Home";
import NotFound from "./components/PageNotFound/NotFound";
import LogIn from "./components/Registration/LogIn/LogIn";
import RequiredAuth from "./components/Registration/RequiredAuth/RequiredAuth";
import SignUp from "./components/Registration/SignUp/SignUp";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LogIn />}></Route>
        <Route path="signup" element={<SignUp />}></Route>
        <Route
          path="home"
          element={
            <RequiredAuth>
              <Home />
            </RequiredAuth>
          }
        ></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
