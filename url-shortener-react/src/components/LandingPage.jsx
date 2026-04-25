import { useNavigate } from "react-router-dom";
import React from "react";
import { motion } from "framer-motion";

import Card from "./Card";
import { useStoreContext } from "../contextApi/ContextApi";

const LandingPage = () => {
  const navigate = useNavigate();
  const { token } = useStoreContext();

  // ✅ Safe navigation helper
  const goTo = (path) => {
    if (!token) {
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] lg:px-14 sm:px-8 px-4">

      {/* HERO SECTION */}
      <div className="flex flex-col lg:flex-row justify-between items-center pt-16 lg:py-5 gap-8 lg:gap-10">

        {/* LEFT */}
        <div className="flex-1">
          <motion.h1
            initial={{ opacity: 0, y: -80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-bold text-slate-800 text-3xl sm:text-4xl md:text-5xl leading-tight"
          >
            Linklytics Simplifies URL Shortening For Efficient Sharing.
          </motion.h1>

          <p className="text-slate-700 text-sm my-5">
            Linklytics streamlines URL shortening with an intuitive interface.
            Create, manage, and share links instantly with powerful analytics.
          </p>

          {/* ✅ BUTTONS */}
          <div className="flex gap-3">

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => goTo("/dashboard")}
              className="bg-custom-gradient w-40 text-white rounded-md py-2 hover:opacity-90 transition"
            >
              Manage Links
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => goTo("/create")}
              className="border border-btnColor w-40 text-btnColor rounded-md py-2 hover:bg-btnColor hover:text-white transition"
            >
              Create Short Link
            </motion.button>

          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex-1 flex justify-center w-full">
          <motion.img
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-[400px] sm:w-[480px] rounded-md"
            src="/images/img2.png"
            alt="Linklytics preview"
          />
        </div>
      </div>

      {/* FEATURES */}
      <div className="pt-10 sm:pt-12">
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-slate-800 font-bold text-3xl text-center mx-auto max-w-3xl"
        >
          Trusted by individuals and teams worldwide
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-6">
          <Card
            title="Simple URL Shortening"
            desc="Create short, memorable URLs instantly."
          />
          <Card
            title="Powerful Analytics"
            desc="Track clicks and performance in real time."
          />
          <Card
            title="Enhanced Security"
            desc="Secure and reliable link management."
          />
          <Card
            title="Fast and Reliable"
            desc="High-speed redirects with zero downtime."
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;