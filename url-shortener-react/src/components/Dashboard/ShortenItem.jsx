import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard';
import { FaExternalLinkAlt, FaRegCalendarAlt } from 'react-icons/fa';
import { IoCopy } from 'react-icons/io5';
import { LiaCheckSolid } from 'react-icons/lia';
import { MdAnalytics, MdOutlineAdsClick } from 'react-icons/md';
import api from '../../api/api';
import { Link } from 'react-router-dom';
import { Hourglass } from 'react-loader-spinner';
import Graph from './Graph';

const ShortenItem = ({ originalUrl, shortUrl, clickCount, createdDate }) => {
    const [isCopied, setIsCopied] = useState(false);
    const [analyticToggle, setAnalyticToggle] = useState(false);
    const [loader, setLoader] = useState(false);
    const [selectedUrl, setSelectedUrl] = useState("");
    const [analyticsData, setAnalyticsData] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");

    const subDomain = import.meta.env.VITE_REACT_FRONT_END_URL.replace(
        /^https?:\/\//,
        ""
    );

    const analyticsHandler = (shortUrl) => {
        if (!analyticToggle) {
            setSelectedUrl(shortUrl);
        }
        setAnalyticToggle(!analyticToggle);
    };

    const fetchMyShortUrl = async () => {
        setLoader(true);
        setErrorMsg("");

        try {
            // ✅ FIX: SAFE DATE RANGE (NO FUTURE)
            const startDate = dayjs().subtract(1, "year").format("YYYY-MM-DD");
            const endDate = dayjs().format("YYYY-MM-DD");

            const { data } = await api.get(
                `/api/urls/analytics/${selectedUrl}?startDate=${startDate}&endDate=${endDate}`
            );

            // ✅ handle empty response
            if (!data || data.length === 0) {
                setAnalyticsData([]);
                setErrorMsg("No analytics data available");
            } else {
                setAnalyticsData(data);
            }

            setSelectedUrl("");
        } catch (error) {
            console.log("Analytics Error:", error);

            // ✅ instead of redirecting → show message
            setErrorMsg("Unable to load analytics");
            setAnalyticsData([]);
        } finally {
            setLoader(false);
        }
    };

    useEffect(() => {
        if (selectedUrl) {
            fetchMyShortUrl();
        }
    }, [selectedUrl]);

    return (
        <div className="bg-slate-100 shadow-lg border border-dotted border-slate-500 px-6 py-4 rounded-md">

            {/* TOP SECTION */}
            <div className="flex sm:flex-row flex-col justify-between gap-5">

                <div className="flex-1">
                    <Link
                        target="_blank"
                        className="text-[17px] font-semibold text-linkColor"
                        to={`${import.meta.env.VITE_REACT_FRONT_END_URL}/s/${shortUrl}`}
                    >
                        {subDomain + "/s/" + shortUrl}
                    </Link>

                    <p className="text-slate-700">{originalUrl}</p>

                    <div className="flex gap-6 pt-3">
                        <div className="flex items-center text-green-800 font-semibold">
                            <MdOutlineAdsClick />
                            <span className="ml-1">{clickCount} Clicks</span>
                        </div>

                        <div className="flex items-center text-slate-800">
                            <FaRegCalendarAlt />
                            <span className="ml-1">
                                {dayjs(createdDate).format("MMM DD, YYYY")}
                            </span>
                        </div>
                    </div>
                </div>

                {/* ACTIONS */}
                <div className="flex gap-3 items-center">
                    <CopyToClipboard
                        text={`${import.meta.env.VITE_REACT_FRONT_END_URL}/s/${shortUrl}`}
                        onCopy={() => setIsCopied(true)}
                    >
                        <button className="bg-btnColor text-white px-4 py-2 rounded-md">
                            {isCopied ? "Copied" : "Copy"}
                        </button>
                    </CopyToClipboard>

                    <button
                        onClick={() => analyticsHandler(shortUrl)}
                        className="bg-rose-700 text-white px-4 py-2 rounded-md flex items-center gap-1"
                    >
                        Analytics <MdAnalytics />
                    </button>
                </div>
            </div>

            {/* ANALYTICS */}
            {analyticToggle && (
                <div className="mt-5 border-t pt-4">

                    {loader ? (
                        <div className="flex justify-center">
                            <Hourglass height="40" width="40" />
                        </div>
                    ) : errorMsg ? (
                        <p className="text-center text-red-500">{errorMsg}</p>
                    ) : analyticsData.length === 0 ? (
                        <p className="text-center text-gray-500">
                            No data available
                        </p>
                    ) : (
                        <Graph graphData={analyticsData} />
                    )}

                </div>
            )}
        </div>
    );
};

export default ShortenItem;