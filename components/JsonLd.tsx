// components/JsonLd.tsx  (⚠️ sem "use client")
type JsonLdProps = {
  id: string;
  data: unknown; // aceita objeto único ou array / @graph
};

export function JsonLd({ id, data }: JsonLdProps) {
  return (
    <script
      id={id}
      type="application/ld+json"
      // JSON.stringify com  espaços deixa legível no "view-source"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}