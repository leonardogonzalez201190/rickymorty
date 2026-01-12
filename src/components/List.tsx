import { useApi } from "../context/ApiContext";
import { navigate } from "../routes";
import type { RMCharacter } from "../types";
import { Card } from "./Card";

export function List() {

    const { characters, loading } = useApi();

    return (
        <section className="list">
            {loading ? (
                Array.from({ length: 10 }).map((_, index) => (
                    <article
                        key={index}
                        className="list__item_loading"
                    />
                ))
            ) : characters.length === 0 ? (
                <p>No characters found.</p>
            ) : (
                characters.map((character: RMCharacter) => (
                    <Card
                        key={character.id}
                        onClick={() => navigate(`/details/${character.id}`)}
                        image={character.image}
                        name={character.name}
                        status={character.status}
                    />
                ))
            )}
        </section>
    )
}