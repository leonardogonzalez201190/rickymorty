import { useInViewport } from "../hooks/useInViewport";
import type { CardProps } from "../types";

export function Card({
    image,
    name,
    status,
    species,
    gender,
    origin,
    onClick,
    variant = "list",
    isLoading = false,
}: CardProps) {

    const { ref, visible } = useInViewport();
    const isDetails = variant === "details";

    return (
        <article
            tabIndex={0}
            role="button"
            aria-label={`View details of ${name}`}
            ref={ref}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onClick?.();
                }
            }}
            className={`list__item ${isDetails ? "card--details" : "card--list"}`}
            onClick={onClick}
        >
            {(isLoading || !visible) ?
                <div
                    className="list__item_loading"
                    role="status"
                    aria-label="loading"
                />
                : <img
                    src={image}
                    alt={name}
                    className="card__image"
                />}

            <footer className="card__footer">
                <h3>{isLoading ? "Name" : name}</h3>
                <div className="card__status">
                    <span className={`status-dot ${status === "Alive" ? "status-dot--alive" : "status-dot--dead"}`}
                        aria-hidden
                    />

                    <span className="status-text">
                        {isLoading ? "Status" : status} – {isLoading ? "Species" : species}
                    </span>
                </div>
                {isDetails && (
                    <>
                        <p><strong>Gender:</strong> {isLoading ? "Gender" : gender}</p>
                        <p><strong>Origin:</strong> {isLoading ? "Origin" : origin?.name}</p>
                    </>
                )}

            </footer>
        </article>
    );
}
