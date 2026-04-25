import { useQuery } from "react-query"
import api from "../api/api"

export const useFetchMyShortUrls = (token, onError) => {
    return useQuery("my-shortenurls",
        async () => {
            const res = await api.get("/api/urls/myurls");
            return res.data;
        },
        {
            select: (data) => {
                return data.sort(
                    (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
                );
            },
            onError,
            staleTime: 5000
        }
    );
};

export const useFetchTotalClicks = (token, onError) => {
    return useQuery("url-totalclick",
        async () => {
            const res = await api.get(
                "/api/urls/totalClicks?startDate=2024-01-01&endDate=2025-12-31"
            );
            return res.data;
        },
        {
            select: (data) => {
                return Object.keys(data).map((key) => ({
                    clickDate: key,
                    count: data[key],
                }));
            },
            onError,
            staleTime: 5000
        }
    );
};