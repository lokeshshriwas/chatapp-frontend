import "./index.css"
import { Route, Routes } from "react-router-dom";
import Chatpage from "./pages/Chatpage"
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";

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
