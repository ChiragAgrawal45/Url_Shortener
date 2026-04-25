import React from "react";
import ShortenItem from "./ShortenItem";

const ShortenUrlList = ({ data = [] }) => {

  if (data.length === 0) {
    return (
      <div className="text-center text-slate-600 py-10">
        No URLs found
      </div>
    );
  }

  return (
    <div className="my-6 space-y-4">
      {data.map((item) => (
        <ShortenItem key={item.id || item.shortUrl} {...item} />
      ))}
    </div>
  );
};

export default ShortenUrlList;