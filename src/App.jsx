import "./index.css"
import { Route, Routes } from "react-router-dom";
import Chatpage from "./pages/Chatpage"
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_BASEURL;
axios.defaults.withCredentials = true;

function App() {
  return (
      <Routes>
        <Route path="/" exact Component={Login} />
        <Route path="/register" exact Component={Signup} />
        <Route path="/chats" Component={Chatpage} />
      </Routes>
  );
}

export default App;
