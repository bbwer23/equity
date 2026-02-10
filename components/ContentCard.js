export default function ContentCard({ title, content }) {
  return (
    <section className="card">
      <h3>{title}</h3>
      <p style={{ whiteSpace: "pre-wrap", lineHeight: 1.6 }}>{content}</p>
    </section>
  );
}
