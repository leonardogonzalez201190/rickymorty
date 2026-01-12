// Details page: Displays detailed information for a single character.
// The character ID is extracted from the URL using a custom route param parser.

import { BackButton } from "../components";
import { Card } from "../components/Card";
import { useRMDetail } from "../hooks";

export default function Details({ params }: { params: { id: string } }) {

  const { id } = params;
  const { character, loading, error } = useRMDetail(id);

  return (
    <section className="details-container">
      <h2>Details</h2>

      <BackButton />

      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && <Card isLoading={true} variant="details" />}
      {character && (
        <Card
          variant="details"
          image={character.image}
          name={character.name}
          status={character.status}
          species={character.species}
          gender={character.gender}
          origin={character?.origin}
        />
      )}
    </section>
  );
}