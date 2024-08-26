import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchNews} from "../asyncThunks/fetchNews.ts";

 export interface Article {
    id: number;
    title: string;
    url: string;
    image_url: string;
    news_site: string;
    summary: string;
    published_at: string;
    updated_at: string;
    featured: boolean;
}

interface NewsState {
    newsList: Article[];
    likedArticles: { [key: number]: boolean };
    showOnlyLiked: boolean,
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: NewsState = {
    newsList: [],
    status: "idle",
    error: null,
    likedArticles: {},
    showOnlyLiked: false,
};

const newsSlice = createSlice({
    name: "news",
    initialState,
    reducers: {
        removeNews(state, action: PayloadAction<number>) {
            state.newsList = state.newsList.filter((item) => item.id !== action.payload);
        },
        toggleLike(state, action: PayloadAction<number>) {
            const articleId = action.payload;
            state.likedArticles[articleId] = !state.likedArticles[articleId];
        },
        toggleShowOnlyLiked(state) {
            state.showOnlyLiked = !state.showOnlyLiked;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNews.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchNews.fulfilled, (state, action: PayloadAction<Article[]>) => {
                state.status = "succeeded";
                state.newsList = action.payload;
            })
            .addCase(fetchNews.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    },
});

export const {removeNews, toggleLike, toggleShowOnlyLiked} = newsSlice.actions;
export default newsSlice.reducer;
