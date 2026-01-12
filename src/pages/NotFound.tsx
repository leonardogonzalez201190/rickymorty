import { BackButton } from "../components";


export default function NotFound() {
    return (
        <section className="not-found">
            <BackButton />
            <h2>404</h2>
            <p>Page not found</p>
        </section>
    );
}