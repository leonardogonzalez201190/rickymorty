import { Card } from "./Card";
import { BackButton } from "./BackButton";

export default function DetailsSkeleton() {
    return (
        <section className="details-container">
            <h2>Details</h2>

            <BackButton />

            <Card isLoading={true} variant="details" image="" name="" status="" />

        </section>
    );
}