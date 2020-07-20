import moment, { Moment } from 'moment';
import Head from 'next/head';
import { GetStaticProps } from 'next';

interface Source {
  id: string;
  name: string;
}

interface Article {
  source: Source;
  author?: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: Date;
  content: string;
}

interface News {
  status: string;
  totalResults: number;
  articles: Array<Article>;
}

interface Home {
  news: News;
  date: Moment;
}

const Home: React.FC<Home> = ({ news, date }) => {
  const { articles } = news;

  return (
    <>
      <Head>
        <title>Next.js News</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Next.js News</h1>
      <p className="subtitle">Notícias carregas em: {date}</p>

      {articles.map(
        ({ source, title, description, url, urlToImage, publishedAt }) => (
          <div key={title} className="row">
            <img src={urlToImage} alt="News image" />
            <div className="info">
              <a href={url} target="_blank" className="title">
                {title}
              </a>
              <p>{description}</p>
              <p>
                <b>Fonte: </b> {source.name}
              </p>
              <p>
                <b>Publicado em: </b> {moment(publishedAt).format('DD/MM/YYYY')}
              </p>
            </div>
          </div>
        )
      )}

      <style jsx>{`
        .subtitle {
          font-size: 19px;
          margin-bottom: 24px;
        }
        .row {
          width: 100%;
          display: flex;
          align-items: center;
          margin-bottom: 32px;
        }
        .info {
          width: 80%
          display: flex;
          flex-direction: column;
          padding: 16px;
        }
        .title {
          font-size: 20px;
          color: black;
          font-weight: bold;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0 16px;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        img {
          width: 20%;
          height: auto;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(
    `https://newsapi.org/v2/top-headlines?country=br&pageSize=10&page=1&apiKey=${process.env.REACT_APP_API_KEY}`
  );
  const news = await res.json();

  const date = moment().format('DD/MM/YYYY');

  return {
    props: {
      news,
      date,
    },
  };
};

export default Home;
