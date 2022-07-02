import Head from "next/head";
import styles from "../styles/Quizapp.module.css";
import { GithubGist } from "react-gistlab";
import Sidebar from "../components/sidebar";

export default function Quizapp() {

  return (
    <div className={styles.background}>
         <Sidebar />
      <Head>
        <title>The making of quizapp</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className={styles.title}>The making of quizapp</h1>
      <div className={styles.textcontainer}>
        <div className={styles.imagecontainer}>
          <img className={styles.quizappimg} src={"/Site_Assets/quizapp_dashboard.png"}></img>
        </div>
        <h2 className={styles.subheading}>Introduction </h2>
        <p className={styles.description}>
          This whole solution relies on Node.js for the server, Express for
          the middleware, React for the front-end framework and MariaDB for
          the database.

          I also implemented tailwind CSS framework since I wanted to increase
          the efficiency in which I styled the many elements inside the
          front-end.
        </p>

        <p className={styles.description}>
          This project was quite ambitious, with the scope widening as soon as I realised it needed to have a large suite of features.
          I began with designing the development stack, where I settled on Node.js, Express, React and MariaDB. This was my first deep dive
          into javascript frameworks and I was very excited to see how it all worked together.
        </p>
        <p className={styles.description}>
          I began by implementing a basic login system, which was a simple form with a submit button which would send a POST request to the server
          and then the client would save this token inside session storage. After doing a lot of research into OWASP and security I quickly became aware of
          how a XSS attack could potentially read the JWT token from local/sessionstorage.
          A lot of tutorials and articles seem to not take this into account, this led me to cfiguring out my own solution
        </p>


        <h2 className={styles.subheading}>My Authentication Solution </h2>
        <p className={styles.description}>
          When designing my authentication system, I wanted to foremost make the system incredibly secure.
          I firstly I made use of SQL parameterisation to prevent SQL injection attacks.
          I also made use of BCrypt hashing algorithm to hash the passwords of my users.
          Furthermore, I utilised JSON web tokens to provide a secure way of creating user sessions.
        </p>
        <p className={styles.description}>
          Ultimately, I followed OWASP standards and implemented both an access token set to 15 minutes and a refresh token set to 7 days.
          The refresh tokens were designed to be used to refresh the access tokens. Creating a seamless user experience for the user.
        </p>
        <p className={styles.description}>
          However, with the refresh tokens having quite some power I needed to keep them secure.
          I decided to ensure that the refresh token was stored as an HTTP-Only cookie which cannot be read by Javascript.
        </p>
        <div className={styles.imagecontainer}>
          <img className={styles.quizappimg} src={"/Site_Assets/login workflow.png"}></img>
        </div>

        <h2 className={styles.subheading}>Database</h2>
        <p className={styles.description}>
          I constructed the schema of the database by creating a table for
          users, a table for their scores, a table for quizzes and questions
          and a table for question options.
        </p>
        <div className={styles.code} >
          <GithubGist
            url="https://gist.github.com/Chuccle/e67dbb626792f667f5e6101f77f67772"
            Loading={() => <p>Loading...</p>}></GithubGist>
        </div>
        <p className={styles.description}>
          This was to minimize data duplication and create much more efficient
          querying.This did come back to bite me however, when my queries
          became pretty complex very fast.
        </p>
        <p className={styles.description}>
          As I was using MariaDB I could make use of the better performance
          and features than MYSQL if I were to have used an object relational
          mapper like sequelize I would have lost the flexibility and
          performance of raw SQL queries
        </p>
        <h2 className={styles.subheading}>Token flow </h2>
        <p className={styles.description}>
          Every time, before sending an API request to the server we first
          send a refresh request to ensure that the token is in date and
          ensure the API request works seamlessly.
        </p>
        <div className={styles.imagecontainer}>
          <img className={styles.quizappimg} src={"/Site_Assets/seamless session quizapp.png"}></img>
        </div>

        <h2 className={styles.subheading}>API code </h2>
        <p className={styles.description}>
          Below is the code snippet for the API endppoint, it`s written in node.js. I used the express framework for the middleware.
        </p>
        <div className={styles.code} >
          <GithubGist
            url="https://gist.github.com/Chuccle/07cb855aae7c1a41025d9b0039b5de47"
            Loading={() => <p>Loading...</p>}
          />
        </div>
        <p className={styles.description}>
          Full code available - <a href="https://github.com/Chuccle">
            <svg height="32" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="32" data-view-component="true" fill="white"  >
              <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
            </svg>
          </a>
        </p>
      </div>
    </div>
  );
}
