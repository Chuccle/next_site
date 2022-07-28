import Head from "next/head";
import styles from "../styles/CV.module.css";
import Link from "next/link";

export default function Resume(): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <Head>
        <title>The making of quizapp</title>
        <link rel="icon" type="image/svg+xml" href="favicon.svg" />
      </Head>


      <main className={styles.main}>

        <article>
          <header><h1>CV</h1></header>

          <h2>Introduction</h2>

          <hr />

          <p>IT is my passion; in my spare time I enjoy coding personal projects.
            Comfortable working as part of a team or independently I have a can do attitude and am a fast learner. A company that gave me the opportunity to develop my skills, would find me a loyal and dedicated worker.</p>

          <h2>Skills</h2>

          <hr />

          <figure><table><tbody>

            <tr><td><strong>Development skills:</strong></td>

              <td>VB.NET/C#,
                Typescript,
                HTML,
                CSS,
                SQL,
                C++,
                Rust,
                Kotlin</td></tr>

            <tr><td><strong>Software skills:</strong></td>

              <td>Git,
                Microsoft office,
                MS Teams,
                Heroku,
                Linux
              </td></tr>

          </tbody></table></figure>


          <h2>Qualifications</h2>

          <hr />

          <ul>
            <li> 8 GCSE Grade 4 - 9 including English and Maths </li>
            <li> Silver Duke of York award for Young Enterprise </li>
            <li> Distinction * Cambridge Nationals ICT </li>
            <li> Distinction * ECDL </li>
            <li> D*D*D* Level 3 BTEC BIT Extended Diploma </li>
          </ul>

          <h2>Experience</h2>

          <hr />

          <h3>Workshop Technician • ITChampion</h3>

          <p><em>March &#8208; August 2020</em> </p>

          <p>At ITChampion my duties included diagnosis, repair, build, and configuration of client specific PCs and phones. Due to the Covid-19 pandemic, I was regularly in charge of the workshop; co-ordinating and distributing workload between my colleagues,
            An example of a rather complex client specific setup I had to do was on a surface pro laptop. The client insisted on having a bitlocker pin and TPM verification in which I had to edit group policy settings and use cmdlets in PowerShell to allow a preboot on-screen keyboard.
          </p>

          <p>
            I would also liaise with our company&apos;s suppliers; handling warranties, repairs, and returns. I was also very proactive on service degradation on any of our client&apos;s platforms.
            Occasionally. I would also handle support calls for password resets and PC problems via our RMM (ConnectWise).
          </p>

          <p>I was very vigilant about the level of authorisation a particular client from a company had and curated a VIP list consisting of those who had the most authorisation within their respective organisations and companies.</p>


          <h2>Projects</h2>
          <hr />

          <h3>Commercial/freelance:</h3>

          <p><strong>Exe valley cars</strong> - I created an android application that schedules appointments and their times based on the user&apos;s location.</p>

          <h3>Personal:</h3>

          <p><strong>Quizapp</strong>- A fully functioning MERN web application which features a stateless authentication system</p>

          <p><strong>Alarm system</strong>- A high performance application involving a BBC microbit with a PIR sensor connected via USB to a raspberry PI and connected to an actix rust web server. </p>

          <h3>Links:</h3>
          <ul>
            <li><Link href="https://github.com/Chuccle/TaxiApp">Taxiapp</Link> (open source version)</li>
            <li><Link href="https://github.com/Chuccle/quiz-app">Quizapp front end</Link> </li>
            <li><Link href="https://github.com/Chuccle/quizapp-backend">Quizapp back end </Link></li>
            <li><Link href="https://github.com/Chuccle/My-old-Car-rental-application-project">Car rental app </Link></li>
            <li><Link href="https://github.com/Chuccle/pir-microbit-sensor-serial-write">Microbit code</Link></li>
            <li><Link href="https://github.com/Chuccle/Microbit_HTTP_Proxy">Microbit HTTP Proxy</Link></li>
            <li><Link href="https://github.com/Chuccle/emailserver">Email Server</Link></li>
          </ul>

          <h2>Referees</h2>

          <hr />

          <p><strong>Ruth Horne</strong> - Exe valley cars: exevalleycars@hotmail.co.uk</p>

        </article>
      </main>
    </div>
  );
}