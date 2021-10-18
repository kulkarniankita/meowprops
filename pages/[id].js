import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import compliments from "../data/compliments.json";

export async function getStaticProps(context) {
  const { id } = context.params;
  const fromTwitterId = id.split("-")[0];
  const toTwitterId = id.split("-")[1];

  const desc = compliments[Math.floor(Math.random() * 1) + 0].text;
  const randomMeowPic = Math.floor(Math.random() * 0) + 0;

  console.log({ desc, randomMeowPic });
  return {
    props: {
      tweet: `${toTwitterId}, ${fromTwitterId} would like to say, ${desc}`,
      randomMeowPic,
      desc,
      fromTwitterId,
      toTwitterId,
    },
    revalidate: 60 * 60,
  };
}

export async function getStaticPaths(context) {
  return {
    paths: [{ params: { id: "0" } }],
    fallback: true,
  };
}

export default function Page(props) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <main className="container">
      <Head>
        <title>Meow Props</title>
        <link rel="icon" href="/favicon.ico" />

        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:title"
          content={"Be kind and give a props to someone"}
        />

        <meta name="twitter:creator" content={props.fromTwitterId} />
        <meta
          name="twitter:image"
          content={`https://meowprops.vercelapp/icons/${props.randomMeowPic}.png`}
        />
        <meta name="twitter:description" content={props.desc} />

        <meta
          property="og:title"
          content={`Meow Props to ${props.toTwitterId}`}
        />
        <meta property="og:url" content="https://meowprops.vercel.app" />
        <meta property="og:image" content="/icons/0.png" />
        <meta property="og:description" content={props.desc} />
        <meta
          property="og:site_name"
          content={`Meow Props to ${props.toTwitterId}`}
        />
      </Head>
      <div className="glass">
        <div className="meowWrapper">
          <Image
            src={`/meowpics/${props.randomMeowPic}.png`}
            width="160px"
            height="160px"
            className="meowPic"
          />
        </div>
        <div className="bigTextWrapper">
          <h1 className="title">You're awesome!</h1>
          <p className="bigText">{props.tweet}</p>
          <a
            href="https://twitter.com/share?ref_src=twsrc%5Etfw"
            className="twitter-share-button"
            data-show-count="false"
            data-via={props.fromTwitterId}
            data-size="large"
            data-text={props.tweet}
          >
            Tweet
          </a>
          <script
            async
            src="https://platform.twitter.com/widgets.js"
            charset="utf-8"
          ></script>
        </div>
      </div>
      <style jsx>{`
        .container {
          padding: 4rem;
        }

        .title {
          font-size: 3rem;
        }

        .meowPic {
          max-width: 100%;
        }
        .meowWrapper {
          margin-top: 3rem;
        }
        .bigText {
          font-size: 4rem;
        }
        .bigTextWrapper {
          padding-left: 2rem;
        }

        .glass {
          display: flex;
          background: hsla(0, 0%, 100%, 0.4);
          -webkit-backdrop-filter: blur(10px);
          backdrop-filter: blur(10px);
          border: 1px solid hsla(0, 0%, 100%, 0.2);
          height: 100%;
          border-radius: 1rem;
          padding: 4rem;
          padding-right: 6rem;
        }

        .glass:hover {
          background: hsla(0, 0%, 100%, 0.7);
          border: 1px solid #fff;
          cursor: pointer;
        }
      `}</style>

      <style jsx global>{``}</style>
    </main>
  );
}
