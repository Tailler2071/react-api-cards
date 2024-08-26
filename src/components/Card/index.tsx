import {Link} from "react-router-dom";
import {removeNews, toggleLike} from "../../redux/slices/newsSlice.ts";
import {useAppDispatch, useAppSelector} from "../../redux/hooks.ts";
import HeartIcon from "../../assets/heart.svg?react";
import {CardProps} from "./card.props.ts";
import s from "./card.module.scss";

const Card = ({id, image, title, summary, date}: CardProps) => {
    const dispatch = useAppDispatch();
    const isLiked = useAppSelector((state) => state.newsSlice.likedArticles[id]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);

        return date.toLocaleDateString("ru-RU", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });
    };

    const handleLike = () => {
        dispatch(toggleLike(id));
    };

    const handleDelete = () => {
        dispatch(removeNews(id));
    };

    return (
        <article className={s.card}>
            <Link to={`/card/${id}`} className={s.link} aria-label={"Read more"}></Link>
            <img className={s.image} src={image} alt={title}/>
            <div className={s.body}>
                <h2 className={s.title}>{title}</h2>
                <div className={s.summary}>{summary}</div>
                <div className={s.date}>🕘 {formatDate(date)}</div>
                <button
                    className={s.delete}
                    onClick={handleDelete}
                >
                    Удалить
                </button>
                <div className={!isLiked ? s.heart : `${s.heart} ${s.activeHeart}`}>
                    <button onClick={handleLike} aria-label="Toggle like">
                        <HeartIcon/>
                    </button>
                </div>
            </div>
        </article>
    );
};

export default Card;
