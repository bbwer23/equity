"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "../components/Layout";

export default function HomePage() {
  const router = useRouter();
  const [niche, setNiche] = useState("");
  const [contentType, setContentType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!niche || !contentType) {
      setError("Please provide both a niche and a content type.");
      return;
    }

    setLoading(true);

    try {
      // Call the serverless API route to generate copy.
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ niche, contentType }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      // Store the result for the dashboard without a database.
      sessionStorage.setItem(
        "ai-copy-concierge",
        JSON.stringify({
          niche,
          contentType,
          content: data.content,
        })
      );

      // Move the user to the dashboard after generation.
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="grid grid-2">
        <section className="card">
          <h2>Generate campaign-ready copy</h2>
          <p className="muted">
            Tell us about your niche and the type of content you need. We will
            craft something polished for you in seconds.
          </p>
          <form onSubmit={handleSubmit} className="grid" style={{ marginTop: "1.5rem" }}>
            <div>
              <label htmlFor="niche">Niche</label>
              <input
                id="niche"
                name="niche"
                placeholder="e.g. Boutique fitness studio"
                value={niche}
                onChange={(event) => setNiche(event.target.value)}
              />
            </div>
            <div>
              <label htmlFor="contentType">Content type</label>
              <input
                id="contentType"
                name="contentType"
                placeholder="e.g. Instagram post"
                value={contentType}
                onChange={(event) => setContentType(event.target.value)}
              />
            </div>
            {error ? <p style={{ color: "#dc2626" }}>{error}</p> : null}
            <button type="submit" disabled={loading}>
              {loading ? "Generating..." : "Generate AI Content"}
            </button>
          </form>
        </section>
        <section className="card" style={{ background: "#0f172a", color: "#f8fafc" }}>
          <h2>Your AI copy concierge</h2>
          <p style={{ color: "#cbd5f5", lineHeight: 1.6 }}>
            Skip blank-page syndrome. Our AI assistant drafts professional
            marketing content so your team can focus on strategy, approvals, and
            execution.
          </p>
          <ul style={{ paddingLeft: "1.2rem", lineHeight: 1.8 }}>
            <li>Professional tone tuned to your niche.</li>
            <li>Ready-to-post copy for ads, emails, and social.</li>
            <li>Upgrade anytime for unlimited generations.</li>
          </ul>
        </section>
      </div>
    </Layout>
  );
}
