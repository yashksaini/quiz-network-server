import { useEffect, useState } from "react";
import { Switch, HashRouter } from "react-router-dom";
import axios from "axios";

import UnprotectedRoute from "./UnprotectedRoute";
import ProtectedRoute from "./ProtectedRoute";
import Signup from "./beforeLogin/Signup";
import Home from "./beforeLogin/Home";

import Profile from "./afterLogin/Profile";
import Myquizes from "./afterLogin/Myquizes";
import Questions from "./afterLogin/Questions";
import Create from "./afterLogin/Create";
import Quiz from "./afterLogin/Quiz";

import "./App.scss";

function App() {
  let tempValue = false;
  if (JSON.parse(localStorage.getItem("IsAuth")) !== null) {
    tempValue = JSON.parse(localStorage.getItem("IsAuth"));
  } else {
    localStorage.setItem("IsAuth", false);
  }
  const [isAuth, setIsAuth] = useState(tempValue);
  // Sending Request For Checking Authentication

  const URL = "https://quiz-network-lhfp.onrender.com";
  axios.defaults.withCredentials = true;
  const AuthUser = async () => {
    await axios.get(`${URL}/auth`).then((response) => {
      setIsAuth(response.data);
      localStorage.setItem("IsAuth", response.data);
    });
  };
  useEffect(() => {
    AuthUser();
  }, []);

  return (
    <HashRouter>
      <Switch>
        {/* Before Login */}
        <UnprotectedRoute exact path="/" component={Home} isAuth={isAuth} />
        <UnprotectedRoute
          exact
          path="/signup"
          component={Signup}
          isAuth={isAuth}
        />
        {/* After Login */}
        <ProtectedRoute
          exact
          path="/profile"
          component={Profile}
          isAuth={isAuth}
        />
        <ProtectedRoute
          exact
          path="/my-quizes"
          component={Myquizes}
          isAuth={isAuth}
        />
        <ProtectedRoute
          exact
          path="/questions"
          component={Questions}
          isAuth={isAuth}
        />
        <ProtectedRoute
          exact
          path="/create"
          component={Create}
          isAuth={isAuth}
        />
        <ProtectedRoute
          exact
          path="/quiz/:id"
          component={Quiz}
          isAuth={isAuth}
        />
      </Switch>
    </HashRouter>
  );
}

export default App;
