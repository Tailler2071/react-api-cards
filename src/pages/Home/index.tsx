import {useEffect} from "react";
import {toggleShowOnlyLiked} from "../../redux/slices/newsSlice.ts";
import {useAppDispatch, useAppSelector} from "../../redux/hooks.ts";
import {fetchNews} from "../../redux/asyncThunks/fetchNews.ts";
import Card from "../../components/Card";
import s from "./home.module.scss";

const Home = () => {
    const {newsList, status, likedArticles, showOnlyLiked} = useAppSelector(state => state.newsSlice);
    const dispatch = useAppDispatch();

    const filteredArticles = showOnlyLiked
        ? newsList.filter(article => likedArticles[article.id])
        : newsList;

    useEffect(() => {
        dispatch(fetchNews());
    }, [dispatch]);

    if (status === "loading") return (
        <div className={s.box}>
            <h2 className={s.loading}>Loading...</h2>
        </div>
    );

    return (
        <div className={s.box}>
            <h1 className={s.title}>Spaceflight News</h1>
            <div>
                <button
                    className={s.button}
                    onClick={() => dispatch(toggleShowOnlyLiked())}
                >
                    {showOnlyLiked ? "Show All" : "Show Only Liked"}
                </button>
            </div>

            {filteredArticles.length > 0 ? (
                <div className={s.cards}>
                    {filteredArticles.map(({id, image_url, title, summary, published_at}) => (
                        <Card
                            id={id}
                            key={id}
                            title={title}
                            image={image_url}
                            summary={summary}
                            date={published_at}
                        />
                    ))}
                </div>
            ) : (
                <div className={s.info}>
                    <p>
                        Не найдено ни одной понравившейся новости
                    </p>
                </div>
            )}

        </div>
    );
};

export default Home;
