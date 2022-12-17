import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

import Main from './DIC';
import Navbar from "../components/Navbar";


export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ animal: animalInput }),
    });
    const data = await response.json();
    setResult(data.result);
    setAnimalInput("");
  }

  return (
    <div>
      <Head>
        <title>Aircopy</title>
        <link rel="icon" href="/Logo.png" />
      </Head>
      <div>
        <Navbar></Navbar>
      </div>
      <div className={styles.mainContainer}>
        <Main></Main>
      </div>
    </div> 
  )
}
