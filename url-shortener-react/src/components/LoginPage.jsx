import React, { useState } from "react";
import { useForm } from "react-hook-form";
import TextField from "./TextField";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import toast from "react-hot-toast";
import { useStoreContext } from "../contextApi/ContextApi";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const { setToken } = useStoreContext();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onTouched",
  });

  const loginHandler = async (formData) => {
    setLoader(true);

    try {
      const payload = {
        username: formData.username,
        password: formData.password,
      };

      const response = await api.post("/api/auth/public/login", payload);

      // ✅ safer extraction
      const token = response?.data?.token || response?.data;

      if (!token || typeof token !== "string") {
        throw new Error("Invalid token received from server");
      }

      // ✅ ONLY set in context (localStorage handled there)
      setToken(token);

      toast.success("Login Successful!");
      reset();

      // ✅ slight delay ensures context updates before navigation
      setTimeout(() => {
        navigate("/dashboard");
      }, 100);

    } catch (error) {
      console.log("Login Error:", error);

      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Login Failed!";

      toast.error(message);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex justify-center items-center">
      <form
        onSubmit={handleSubmit(loginHandler)}
        className="sm:w-[450px] w-[360px] shadow-custom py-8 sm:px-8 px-4 rounded-md"
      >
        <h1 className="text-center font-serif text-btnColor font-bold lg:text-3xl text-2xl">
          Login Here
        </h1>

        <hr className="mt-2 mb-5 text-black" />

        <div className="flex flex-col gap-3">
          <TextField
            label="UserName"
            required
            id="username"
            type="text"
            message="*Username is required"
            placeholder="Type your username"
            register={register}
            errors={errors}
          />

          <TextField
            label="Password"
            required
            id="password"
            type="password"
            message="*Password is required"
            placeholder="Type your password"
            register={register}
            min={6}
            errors={errors}
          />
        </div>

        <button
          disabled={loader}
          type="submit"
          className="bg-custom-gradient font-semibold text-white w-full py-2 rounded-sm my-3 hover:opacity-90 transition"
        >
          {loader ? "Loading..." : "Login"}
        </button>

        <p className="text-center text-sm text-slate-700 mt-6">
          Don't have an account?
          <Link
            className="font-semibold underline hover:text-black"
            to="/register"
          >
            <span className="text-btnColor"> SignUp</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;