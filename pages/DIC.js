import React from 'react';
import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  
  const [platform, setPlatform] = useState("twitter dm");
  const [product, setProduct] = useState("personal training");
  const [audience, setAudience] = useState("fat people");
  const [CTA, setCTA] = useState("subscribe to email list");

  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();

    if (loading) {
      return;
    }
    setLoading(true);

    try {
      const response = await fetch("/api/generate-DIC", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ platform, product, audience, CTA }),
      });
      const data = await response.json();
      setResult(data.result);
    } catch(e) {
      alert('Failed to generate DIC copy. Try again')
    } finally {
      setLoading(false);
    }
    

    // reset input
    //setAnimalInput("");
  }

  return (
    <div>
      <Head>
        <title>WardAI</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <h3>DIC Framework generator</h3>
        <form onSubmit={onSubmit}>

          <label>Platform</label>
          <input
            type="text"
            name="platform"
            placeholder="Enter the platform"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
          />

          <label>Product</label>
          <input
            type="text"
            name="product"
            placeholder="Enter the platform"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
          />

          <label>Audience</label>
          <input
            type="text"
            name="audience"
            placeholder="Enter the platform"
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
          />

          <label>CTA</label>
          <input
            type="text"
            name="cta"
            placeholder="Enter the platform"
            value={CTA}
            onChange={(e) => setCTA(e.target.value)}
          />
          <input type="submit" value="Generate names" />
        </form>

        {loading && (
          <div>
            <h3>Loading...</h3>
          </div>
        )}

        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
