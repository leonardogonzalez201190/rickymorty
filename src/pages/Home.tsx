import { useApi } from "../context/ApiContext";

export default function Home() {

    const { characters, loading } = useApi();

    return (
        <section className="container">

            {/* Header */}
            <header>
                <nav className="header__nav">
                    <h1 className="header__title">Rick and Morty</h1>
                    <input role="search" type="search" placeholder="Search" autoFocus={true} />
                    <button>Clear All</button>
                </nav>
                {/* Filters */}
                <nav className="filters">
                    <div>Filters</div>
                    <div>Pagination</div>
                </nav>
            </header>

            {/* Main content */}
            <main className="main-content">
                <section className="list">
                    {loading ? (
                        <p>Loading...</p>
                    ) : characters.length === 0 ? (
                        <p>No characters found.</p>
                    ) : (
                        characters.map((character: any) => (
                            <article key={character.id} className="list__item">
                                <img
                                    src={character.image}
                                    alt={character.name}
                                    style={{ width: "100%", height: "auto" }}
                                />
                                <footer style={{ lineHeight: "normal" }}>
                                    <h3>{character.name}</h3>
                                    <small>{character.status}</small>
                                </footer>
                            </article>
                        ))
                    )}
                </section>
            </main>
        </section>
    );
}