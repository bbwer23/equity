export default function Layout({ children }) {
  return (
    <main>
      <div className="container">
        <header className="card" style={{ marginBottom: "2rem" }}>
          <h1>AI Copy Concierge</h1>
          <p className="muted">
            Generate polished marketing copy in seconds. Share your niche and the
            content type you need, and we will craft something ready to post.
          </p>
        </header>
        {children}
        <footer className="footer">
          Built for teams that want fast, confident copy.
        </footer>
      </div>
    </main>
  );
}
