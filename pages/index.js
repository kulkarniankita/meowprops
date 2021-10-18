import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [fromTwitterId, setFromTwitterId] = useState("");
  const [toTwitterId, setToTwitterId] = useState("");

  const router = useRouter();

  const uniqueUrl = `${fromTwitterId}-${toTwitterId}-${Math.random()}`;
  let url = `http://meowprops.vercel.app/props-${uniqueUrl}`;

  const handleOnChange = (e) => {
    if (e.target.name === "fromTwitterId") {
      setFromTwitterId(e.target.value);
    } else if (e.target.name === "toTwitterId") {
      setToTwitterId(e.target.value);
    }
  };

  const handleOnClick = async () => {
    router.push(uniqueUrl);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Meow Props</title>
        <link rel="icon" href="/favicon.ico" />

        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:title"
          content={"Be kind and give a props to someone"}
        />

        <meta name="twitter:creator" content="@kulkarniankita9" />
        <meta
          name="twitter:image"
          content="https://meowprops.vercelapp/icons/0.png"
        />
        <meta
          name="twitter:description"
          content="Be kind and give a props to someone and this site will automatically share a tweet with you"
        />

        <meta property="og:title" content={"Meow Props"} />
        <meta property="og:url" content="https://meowprops.vercel.app" />
        <meta property="og:image" content="/icons/0.png" />
        <meta
          property="og:description"
          content="Be kind and give a props to someone"
        />
        <meta property="og:site_name" content="Meow Props" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Meow Props 🦋</h1>
        <h2>Give Props to someone awesome!</h2>

        {fromTwitterId && (
          <h3>
            Deployed on: <Link href={url}>{url}</Link>
          </h3>
        )}
        <div className={styles.description}>
          <div className={styles.formWrapper}>
            <label>
              What is the Twitter ID of the person who you would like to give a
              prop to?
            </label>
            <br />
            <input
              type="text"
              name="toTwitterId"
              placeholder="Their Twitter Id"
              value={toTwitterId}
              onChange={handleOnChange}
            />
          </div>

          <div className={styles.formWrapper}>
            <label>What is your Twitter ID?</label>
            <br />
            <input
              type="text"
              name="fromTwitterId"
              placeholder="Give a props to someone"
              value={fromTwitterId}
              onChange={handleOnChange}
            />
          </div>
          <button onClick={handleOnClick}>Preview your page</button>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="http://twitter.com/kulkarniankita9"
          target="_blank"
          rel="noopener noreferrer"
        >
          Creative everything: @kulkarniankita9 ✨
        </a>
      </footer>
    </div>
  );
}
