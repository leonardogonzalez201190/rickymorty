import { Header, Filters, Pagination, List } from "../components";


export default function Home() {
    return (
        <section className="container">
            <header>
                <Header />
                <nav className="filters">
                    <Filters />
                    <Pagination />
                </nav>
            </header>
            <main className="main-content">
                <List />
            </main>
        </section>
    );
}