import {createAsyncThunk} from "@reduxjs/toolkit";
import {Article} from "../slices/newsSlice.ts";

interface ApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Article[];
}

export const fetchNews = createAsyncThunk<Article[], void, { rejectValue: string }>(
    "news/fetchNews",
    async (_, {rejectWithValue}) => {
        try {
            const response = await fetch("https://api.spaceflightnewsapi.net/v4/articles/?limit=12&offset=0");

            if (!response.ok) {
                return rejectWithValue("Server Error!");
            }

            const data: ApiResponse = await response.json();
            return data.results;
        } catch (e) {
            if (e instanceof Error) {
                return rejectWithValue(e.message || "An unknown error occurred");
            }

            return rejectWithValue("An unknown error occurred");
        }
    },
);