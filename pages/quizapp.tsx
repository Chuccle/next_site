import Head from "next/head";
import styles from "../styles/Quizapp.module.css";

export default function Quizapp() {

  return (
    <div className={styles.background}>
      <Head>
        <title>The making of quizapp</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className={styles.title}>The making of quizapp</h1>
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


        <h2 className={styles.subheading}>Authentication </h2>
        First constructed the login and authentication system, uses json web
        token to provide both a http cookie for the refresh token
        authorization header for a session.
        The refresh and access token contain the user`s id in the table. The
        expiry of the access token is 15 minutes.

        <h2 className={styles.subheading}>Database </h2>
        We construct the schema of the database by creating a table for
        users, a table for their scores.A table for quizzes and questions
        and a table for question options.

        This was to minimize data duplication and create much more efficient
        querying.This did come back to bite me however, when my queries
        became pretty complex very fast.

        As I was using MariaDB I could make use of the better performance
        and features than MYSQL if I were to have used an object relational
        mapper like sequelize I would have lost the flexibility and
        performance of raw SQL queries
        <h2 className={styles.subheading}>Token flow </h2>
        Every time, before sending an API request to the server we first
        send a refresh request to ensure that the token is in date and
        ensure the API request works seamlessly.

      </p>
    </div>
  );
}
