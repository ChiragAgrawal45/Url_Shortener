import React, { useState } from "react";
import { useForm } from "react-hook-form";
import TextField from "./TextField";
import api from "../api/api";
import toast from "react-hot-toast";
import { useStoreContext } from "../contextApi/ContextApi";

const CreateShortLink = () => {
  const { token } = useStoreContext();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      originalUrl: "",
    },
    mode: "onTouched",
  });

  const submitHandler = async (formData) => {
    setLoading(true);

    try {
      const { data } = await api.post(
        "/api/urls/shorten",
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      const shortUrl = `${import.meta.env.VITE_REACT_FRONT_END_URL}/s/${data.shortUrl}`;

      await navigator.clipboard.writeText(shortUrl);

      toast.success("Short URL Copied!");

      reset();
    } catch (error) {
      console.log(error);
      toast.error("Failed to create short link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex justify-center items-center">

      <form
        onSubmit={handleSubmit(submitHandler)}
        className="sm:w-[450px] w-[360px] shadow-custom py-8 sm:px-8 px-4 rounded-md"
      >
        <h1 className="text-center font-bold text-2xl text-slate-800">
          Create Short Link
        </h1>

        <hr className="my-4" />

        <TextField
          label="Enter URL"
          required
          id="originalUrl"
          type="url"
          message="URL is required"
          placeholder="https://example.com"
          register={register}
          errors={errors}
        />

        <button
          disabled={loading}
          type="submit"
          className="bg-custom-gradient text-white w-full py-2 rounded-md mt-4"
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </form>
    </div>
  );
};

export default CreateShortLink;