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
                Kotlin,
                MFC,
                WDM,
                CMAKE,
                NMAKE
              </td></tr>

            <tr><td><strong>Software skills:</strong></td>

              <td>Git,
                Microsoft office,
                MS Teams,
                Heroku,
                Linux,
                JIRA,
                Visual Studio,
                Jenkins,
                BuildBot
              </td></tr>

          </tbody></table></figure>


          <h2>Qualifications</h2>

          <hr />

          <ul>
            <li> 8 GCSE Grade 4 - 9 including English and Maths </li>
            <li> Distinction * Cambridge Nationals ICT </li>
            <li> Distinction * ECDL </li>
            <li> D*D*D* Level 3 BTEC BIT Extended Diploma </li>
          </ul>

          <h2>Experience</h2>

          <hr />

          <h3>Software Engineer • ESET Research UK</h3>

          <p><em>August 2022 &#8208; Present</em> </p>

          <ul>
            <li>
              <p>Instrumental in migrating legacy NT drivers into Visual Studio build tools from NMAKE allowing automated building in CI/CD and saving plenty of time in manual builds.</p>
            </li>

            <li>
              <p>Developed CI/CD Jenkins pipelines for existing projects for rapid testing and release. </p>
            </li>

            <li>
              <p>Created test applications to find faults with existing projects and software solutions allowing the team to quickly diagnose issues before QA testing.</p>
            </li>
           
            <li>
              <p>Upgraded older drivers to utilize newer and better technologies I.E: FAT32 to Exfat, formats became much faster and supported capacity became much higher.</p>
            </li>
            
            <li>
              <p>Collaborated to migrate legacy source control into modern source control and helped architect structure which allowed support for for CI/CD pipelines and far better collaborative
                tools along with a more resilient structure.</p>
            </li>
            
            <li>
              <p>Updated historic APIs to utilize more efficient libraries like protocol buffers to reduce network traffic effectively recouping bandwidth to reallocate into other critical areas.</p>
            </li>
            
            <li>
              <p>Collaborated with the technical support team on JIRA to resolve various bugs and issues in an efficient and effective manner.</p>
            </li>
          </ul>
         
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

        </article>
      </main>
    </div>
  );
}