import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authIcons from "./icons/authIcons";
import { Button, useToast } from "@chakra-ui/react";
import axios from "axios";
import {  ChatState } from "../../Context/Chatprovider";

const Login =  () => {
  const navigate = useNavigate()
  const {user} = ChatState()
  if(user) navigate("/chats")

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const toast = useToast();


  const handleShow = (e)=>{
    e.preventDefault()
    setShow(!show)
  }

  const handleSubmit = async () => {
    setLoading(true)
    if(!email || !password){
      toast({
        title: "Please Enter Details",
        position: "bottom",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false)
      return;
    }

    try {
      const config = {
        headers: {
          "Context-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );
      toast({
        title: 'Login successfull',
        position: "bottom",
        status: 'success',
        duration: 5000,
        isClosable: true,
      })

      localStorage.setItem("userInfo", JSON.stringify(data))
      setLoading(false)
      navigate("/chats")
      navigate(0)
    } catch (error) {
      toast({
        title: 'Error Occured',
        description: error.response.data.message,
        position: "bottom",
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
      setLoading(false)
    }
  }
  
  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-6 bg-[url('https://cdn2.f-cdn.com/contestentries/2046262/58571795/61f00c583e000_thumb900.jpg')]">
      <div className="sm:mx-auto sm:w-full sm:max-w-md bg-black bg-opacity-60 pb-2 rounded-2xl">
        <h2 className="mt-4 text-center text-3xl leading-9 font-extrabold text-white">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm leading-5 text-gray-50 max-w">
          Or &nbsp;
          <Link
            to={"/register"}
            className="font-medium text-white underline hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150"
          >
            create a new acccount
          </Link>
        </p>
      </div>

      <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md  bg-black bg-opacity-60 pb-2 rounded-2xl">
        <div className=" py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form>
            <div>
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
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  onChange={(e)=> setEmail(e.target.value)}
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
                  type={show? "text" : "password"}
                  required
                  value={password}
                  onChange={(e)=> setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 "
                />
              <button className="absolute top-2 mt-1 right-3" onClick={(e)=>handleShow(e)}>{show? (authIcons.show ): (authIcons.hide) }</button>
              </div>
            </div>

            <div className="mt-6">
              <span className="block w-full rounded-md shadow-sm">
                <Button
                  type="submit"
                  isLoading={loading}
                  onClick={handleSubmit}
                  colorScheme="blue"
                  className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                >
                  Login
                </Button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
