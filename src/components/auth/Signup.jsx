import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authIcons from "./icons/authIcons";
import { Button, useToast } from "@chakra-ui/react";
import axios from "axios";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [pic, setPic] = useState();
  const [show, setShow] = useState(false);
  const [showConf, setShowConf] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleShow = (e) => {
    e.preventDefault();
    setShow(!show);
  };

  const handleShowConf = (e) => {
    e.preventDefault();
    setShowConf(!showConf);
  };

  const postDetails = async (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please select an Image",
        position: "bottom",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append(
        "upload_preset",
        import.meta.env.VITE_UPLOAD_PRESET.toString()
      );
      data.append("cloud_name", import.meta.env.VITE_CLOUD_NAME.toString());
      fetch("https://api.cloudinary.com/v1_1/dyz3bjoga/image/upload", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url);
          console.log(data.url);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      toast({
        title: "Please select an Image!",
        position: "bottom",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!email || !name || !username || !password) {
      toast({
        title: "Please enter all the field",
        position: "bottom",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }

    if (password !== confirm) {
      toast({
        title: "Password is not matching",
        position: "bottom",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Context-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user/",
        { name, email, password, pic },
        config
      );
      toast({
        title: "Register successfull",
        position: "bottom",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chats");
    } catch (error) {
      toast({
        title: "Error Occured",
        description: error.response.data.message,
        position: "bottom",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen  flex flex-col justify-start py-4 sm:px-6 lg:px-8 bg-[url('https://wallpapercave.com/wp/wp6988787.png')]`}
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md bg-black bg-opacity-60 pb-2 rounded-2xl">
        <h2 className="mt-2 text-center text-3xl leading-9 font-extrabold text-white">
          Create a new account
        </h2>
        <p className="mt-2 text-center text-sm leading-5 text-white max-w ">
          Or &nbsp;
          <Link
            to={"/"}
            className="font-medium text-gray-50 underline hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150"
          >
            login to your account
          </Link>
        </p>
      </div>

      <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-md drop-shadow-2xl ">
        <div className=" bg-black bg-opacity-60 pb-2 rounded-2xl py-8 px-4 shadow sm:rounded-lg sm:px-10 ">
          <form>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-5  text-white"
              >
                Name
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  id="name"
                  placeholder="John Doe"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-black font-semibold focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
                <div className="hidden absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-red-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-5 text-white"
              >
                Username
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  id="username"
                  placeholder="john"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-black font-semibold focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5
                  "
                />
              </div>
            </div>

            <div className="mt-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-5  text-white"
              >
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  id="email"
                  placeholder="user@example.com"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-black font-semibold focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5
                "
                />
                <div className="hidden absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-red-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-5 text-white"
              >
                Password
              </label>
              <div className="mt-1 rounded-md shadow-sm relative">
                <input
                  id="password"
                  type={show ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-black font-semibold focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
                <button
                  className="absolute top-2 mt-1 right-3"
                  onClick={(e) => handleShow(e)}
                >
                  {show ? authIcons.show : authIcons.hide}
                </button>
              </div>
            </div>

            <div className="mt-6">
              <label
                htmlFor="password_confirmation"
                className="block text-sm font-medium leading-5 text-white"
              >
                Confirm Password
              </label>
              <div className="mt-1 rounded-md shadow-sm relative">
                <input
                  id="password_confirmation"
                  type={showConf ? "text" : "password"}
                  required
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-black font-semibold focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
                <button
                  className="absolute top-2 mt-1 right-3"
                  onClick={(e) => handleShowConf(e)}
                >
                  {showConf ? authIcons.show : authIcons.hide}
                </button>
              </div>
            </div>
            <div className="mt-6">
              <label
                htmlFor="profile_pic"
                className="block text-sm font-medium leading-5 text-white"
              >
                Profile Picture
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <input
                  id="profile_pic"
                  type="file"
                  accept="image/*"
                  onChange={(e) => postDetails(e.target.files[0])}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-black font-semibold focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>

            <div className="mt-6">
              <span className="block w-full rounded-md shadow-sm">
                <Button
                  type="submit"
                  onClick={(e) => handleSubmit(e)}
                  isLoading={loading}
                  colorScheme="blue"
                  className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                >
                  Create account
                </Button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
