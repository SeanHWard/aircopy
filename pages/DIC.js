import React from "react";
import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Main() {
  const [type, setType] = useState("");
  const [platform, setPlatform] = useState("t");
  const [length, setLength] = useState("");
  const [formality, setFormality] = useState();
  const [product, setProduct] = useState("");
  const [audience, setAudience] = useState("");
  const [CTA, setCTA] = useState("");

  const [loading, setLoading] = useState(false);
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
        body: JSON.stringify({
          type,
          platform,
          length,
          formality,
          product,
          audience,
          CTA,
        }),
      });
      const data = await response.json();
      setResult(data.result.replaceAll("\n", "<br />"));
    } catch (e) {
      alert("Failed to generate DIC copy. Try again");
    } finally {
      setLoading(false);
    }

    // reset input
    //setAnimalInput("");
  }

  return (
    <div>
      <main className={styles.main}>
        <div className={styles.formContainer}>
          <h1>Aircopy 1.0</h1>
          <h3>By Sean Ward </h3>
          <p>Follow me on Twitter <a href="https://twitter.com/WeanSard">@WeanSard</a></p>
          <form onSubmit={onSubmit}>
            <div className={styles.topFormContainer}>
              <div className={styles.topFormRow}>
                <div className={styles.formElement}>
                  <label className={styles.label}>Type</label>
                  <select
                    className={styles.select}
                    type="text"
                    name="type"
                    placeholder="Enter the platform"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="DIC (Disrupt, Intrigue, Click)">DIC - Disrupt, Intrigue, Click</option>
                    <option value="PAS (Pain/Desire, Amplify, Solution)">
                      PAS - Pain/Desire - Amplify, Solution
                    </option>
                    <option value="HSO (Hook, Story, Offer)">HSO - Hook, Story, Offer</option>
                  </select>
                </div>

                <div className={styles.formElement}>
                  <label className={styles.label}>Platform</label>
                  <select
                    className={styles.select}
                    type="text"
                    name="platform"
                    placeholder="Enter the platform"
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                  >
                    <option value="email. Include a subject line precending the words Subject Line:">Email</option>
                    <option value="direct message">Direct Message</option>
                    <option value="newsletter">Newsletter</option>
                    <option value="social media advertisement">Social Media Ad</option>
                  </select>
                </div>
              </div>
              <div>
                <div className={styles.formElement}>
                  <label className={styles.label}>Length</label>
                  <select
                    className={styles.select}
                    type="text"
                    name="length"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                  >
                    <option value="long (>200 words)">Long</option>
                    <option value="medium {>50 words and <200)">Medium</option>
                    <option value="short (<50 words)">Short</option>
                  </select>
                </div>
                <div className={styles.formElement}>
                  <label className={styles.label}>Formality</label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    name="formality"
                    placeholder="(Informal) 1 - 10 (Formal)"
                    value={formality}
                    onChange={(e) => setFormality(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className={styles.formElement}>
              <label className={styles.label}>Describe your product/service</label>
              <textarea
              className={styles.textarea}
                type="text"
                name="product"
                //placeholder="Enter the platform"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
              />
            </div>
            <div className={styles.formElement}>
              <label className={styles.label}>Describe your intended audience</label>
              <textarea
              className={styles.textarea}
                type="text"
                name="audience"
                //placeholder="Enter the platform"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
              />
            </div>
            <div className={styles.formElement}>
              <label className={styles.label}>What is your Call To Action (CTA)?</label>
              <textarea
              className={styles.textarea}
                type="text"
                name="cta"
                
                //placeholder="Enter the platform"
                value={CTA}
                onChange={(e) => setCTA(e.target.value)}
              />
            </div>
            
            <input className={styles.button} type="submit" value="Generate" />
          </form>
        </div>
        <div>
          {loading && (
            <div>
              <h3>Loading...</h3>
            </div>
          )}

          {result && (
            <div
              className={styles.result}
              dangerouslySetInnerHTML={{ __html: result }}
            ></div>
          )}
        </div>
      </main>
    </div>
  );
}
