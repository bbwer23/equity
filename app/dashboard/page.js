"use client";

import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import ContentCard from "../../components/ContentCard";

export default function DashboardPage() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Pull the latest generation from session storage.
    const stored = sessionStorage.getItem("ai-copy-concierge");
    if (stored) {
      setContent(JSON.parse(stored));
    }
  }, []);

  const handleUpgrade = async () => {
    setError("");
    setLoading(true);

    try {
      // Create a Stripe Checkout session and redirect.
      const response = await fetch("/api/checkout", {
        method: "POST",
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to start checkout.");
      }

      window.location.href = data.url;
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="grid">
        <section className="card">
          <h2>Dashboard</h2>
          <p className="muted">
            Here is your latest AI-generated content. Generate more from the
            landing page anytime.
          </p>
        </section>
        {content ? (
          <ContentCard
            title={`${content.contentType} for ${content.niche}`}
            content={content.content}
          />
        ) : (
          <section className="card">
            <p className="muted">
              No content yet. Head back to the landing page to generate your
              first draft.
            </p>
          </section>
        )}
        <section className="card">
          <h3>Unlimited generations</h3>
          <p className="muted">
            Upgrade to unlock unlimited AI copy generation for just $49.
          </p>
          {error ? <p style={{ color: "#dc2626" }}>{error}</p> : null}
          <button onClick={handleUpgrade} disabled={loading}>
            {loading ? "Redirecting..." : "Upgrade to Unlimited"}
          </button>
        </section>
      </div>
    </Layout>
  );
}
