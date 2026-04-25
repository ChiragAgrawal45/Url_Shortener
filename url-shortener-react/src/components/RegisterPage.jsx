import React, { useState } from "react";
import { useForm } from "react-hook-form";
import TextField from "./TextField";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  const registerHandler = async (formData) => {
    setLoader(true);

    try {
      const response = await api.post(
        "/api/auth/public/register",
        formData
      );

      console.log("SUCCESS:", response.data);

      toast.success("Registration Successful!");
      reset();

      // ✅ slight delay for better UX
      setTimeout(() => {
        navigate("/login");
      }, 100);

    } catch (error) {
      console.error("ERROR:", error);

      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Registration Failed!";

      toast.error(message);

    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex justify-center items-center">
      <form
        onSubmit={handleSubmit(registerHandler)}
        className="sm:w-[450px] w-[360px] shadow-custom py-8 sm:px-8 px-4 rounded-md"
      >
        <h1 className="text-center font-serif text-btnColor font-bold text-2xl">
          Register Here
        </h1>

        <hr className="mt-2 mb-5" />

        <div className="flex flex-col gap-3">

          {/* USERNAME */}
          <TextField
            label="UserName"
            required
            id="username"
            type="text"
            message="*Username is required"
            placeholder="Type your username"
            register={(name) =>
              register(name, {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Minimum 3 characters",
                },
              })
            }
            errors={errors}
          />

          {/* EMAIL */}
          <TextField
            label="Email"
            required
            id="email"
            type="email"
            message="*Email is required"
            placeholder="Type your email"
            register={(name) =>
              register(name, {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email",
                },
              })
            }
            errors={errors}
          />

          {/* PASSWORD */}
          <TextField
            label="Password"
            required
            id="password"
            type="password"
            message="*Password is required"
            placeholder="Type your password"
            register={(name) =>
              register(name, {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters",
                },
              })
            }
            errors={errors}
          />
        </div>

        {/* BUTTON */}
        <button
          disabled={loader}
          type="submit"
          className={`w-full py-2 rounded-sm my-3 text-white transition ${
            loader
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-custom-gradient hover:opacity-90"
          }`}
        >
          {loader ? "Registering..." : "Register"}
        </button>

        <p className="text-center text-sm mt-4">
          Already have an account?
          <Link to="/login" className="text-btnColor ml-1 font-semibold">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;