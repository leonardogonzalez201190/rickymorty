

export function Card({ 
    onClick,
    image,
    name,
    status,
 }: { 
    onClick: () => void,
    image: string,
    name: string,
    status: string
 }) {
    return (
        <article
            className="list__item"
            onClick={onClick}>
            <img
                src={image}
                alt={name}
                style={{ width: "100%", height: "auto" }}
            />
            <footer style={{ lineHeight: "normal" }}>
                <h3>{name}</h3>
                <small>{status}</small>
            </footer>
        </article>
    )
}