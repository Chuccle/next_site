
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'


export default function About() {

  return (


  <><div className={styles.container}>


      <Head>
        <title>The making of quizapp</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          The making of quizapp
        </h1>

        <p className={styles.description}>
          This whole solution relies on Node.js for the server, Express for the middleware, React for the front-end framework and MariaDB for the database.<br />

          I also implemented tailwind CSS framework since I wanted to increase the efficiency in which I styled the many elements inside the front-end.<br />

          First constructed the login and authentication system, uses json web token to provide both a http cookie for the refresh token authorization header for a session.<br />

          The refresh and access token contain the user’s id in the table. The expiry of the access token is 15 minutes.<br />

          We construct the schema of the database by creating a table for users, a table for their scores.A table for quizzes and questions and a table for question options.<br />

          This was to minimize data duplication and create much more efficient querying.This did come back to bite me however, when my queries became pretty complex very fast.<br />

          As I was using MariaDB I could make use of the better performance and features than MYSQL if I were to have used an object relational mapper like sequelize I would have lost the flexibility and performance of raw SQL queries<br />

          Every time, before sending an API request to the server we first send a refresh request to ensure that the token is in date and ensure the API request works seamlessly.<br />
        </p>
      </main>



    </div><Link href="/">
        <a>My first page</a>
      </Link></>


  )
}
