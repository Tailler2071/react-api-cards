import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Article} from "../../redux/slices/newsSlice.ts";
import s from "./fullCard.module.scss";

const FullCard = () => {
    const [news, setNews] = useState<Article | null>(null);
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch(`https://api.spaceflightnewsapi.net/v4/articles/${id}`);

                if (!response.ok) {
                    console.error("Failed to fetch the news article");
                    navigate("/");
                    return;
                }

                const data: Article = await response.json();
                setNews(data);
            } catch (e) {
                if (e instanceof Error) {
                    console.error(e.message);
                }

                navigate("/");
            }
        };

        (async () => {
            await getData();
        })();
    }, [id, navigate]);

    return (
        <div className={s.box}>
            <Link to={"/"} className={s.button}>Назад</Link>
            {!news ?
                (
                    <div className={s.loading}>
                        Загрузка...
                    </div>
                ) : (
                    <>
                        <h2 className={s.title}>{news.title}</h2>
                        <img className={s.image} src={news.image_url} alt={news.title}/>
                        <p className={s.summary}>{news.summary}</p>
                    </>
                )}
        </div>
    );
};

export default FullCard;