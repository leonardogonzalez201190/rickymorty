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
            <div className="card__image-wrapper">
                {(!visible || isLoading) && (
                    <div
                        className="card__image-skeleton"
                        aria-hidden
                    />
                )}

                {visible && !isLoading && (
                    <img
                        src={image}
                        alt={name}
                        className="card__image"
                        loading="lazy"
                        decoding="async"
                    />
                )}
            </div>
            <footer className="card__footer">
                <h3>
                    {isLoading ? <span className="text-skeleton title" /> : name}
                </h3>
                <div className="card__status">
                    {isLoading ? (
                        <span className="text-skeleton line" />
                    ) : (
                        <>
                            <span
                                className={`status-dot ${status === "Alive"
                                    ? "status-dot--alive"
                                    : "status-dot--dead"
                                    }`}
                                aria-hidden
                            />
                            <span className="status-text">
                                {status} – {species}
                            </span>
                        </>
                    )}
                </div>
                {isDetails && (
                    <>
                        <p>
                            <strong>Gender:</strong>{" "}
                            {isLoading ? <span className="text-skeleton small" /> : gender}
                        </p>
                        <p>
                            <strong>Origin:</strong>{" "}
                            {isLoading ? <span className="text-skeleton medium" /> : origin?.name}
                        </p>
                    </>
                )}
            </footer>
        </article>
    );
}
