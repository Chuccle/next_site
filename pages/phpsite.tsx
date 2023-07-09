import Head from "next/head";
import styles from "../styles/Projects.module.css";
import { GithubGist } from "react-gistlab";



export default function PHPSite(): JSX.Element {

    return (
        <div>
            <Head>
                <title>The making of the PHP site</title>
                <link rel="icon" type="image/svg+xml" href="favicon.svg" />
            </Head>

            <h1 className={styles.title}>The making of the PHP site</h1>

            <div className={styles.imagecontainer}>
                <img className={styles.quizappimg} src={"/Site_Assets/phpsite.png"} />
            </div>
            <div className={styles.textcontainer}>

                <h2 className={styles.subheading}>Introduction </h2>

                <p className={styles.description}>
                    This project was designed to be a simple HTML and CSS website with a form handler for a hypothetical company as a project scenario, much like my car rental app.
                </p>

                <p className={styles.description}>
                    The minimum requirements were fairly simple:
                </p>

                <ul className={styles.description} >
                    <li>Should have a form for interested candiates to apply</li>
                    <li>Should feature modern UX and UI techniques</li>
                    <li>Should have multiple pages.</li>
                </ul>

                <p className={styles.description}>
                    I quickly realised that after implementing my form that using third party handlers came with lots of limitations, so I decided to come up with my own,
                    I also wanted to provide a way of submitting a CV in the form of a PDF file.
                </p>


                <h2 className={styles.subheading}>Form handler</h2>

                <p className={styles.description}>
                    Initially as I stated earlier I was using a third party form handler; Later I opted to create my own in PHP.
                    The form would send all the data to a dedicated PHP file in which the data would be parameterised and inserted into a database table.
                </p>

                <div className={styles.code} >
                    <GithubGist
                        url="https://gist.github.com/Chuccle/c94a0a9b047ee583f09994b778e1d6a3"
                        Loading={() => <p>Loading...</p>}>
                    </GithubGist>
                </div>
                <p className={styles.description}>
                    Parameterising as usual is extremely important and at first I had completely neglected to do this, upon reviewing and security testing my app I quickly rectified this.
                </p>

                <p className={styles.description}>
                    I also deliberately stored the PDF as a binary file in the database, this was so that the file could be stored as raw data and then be read by the PHP script later.
                </p>

            </div>

            <div className={styles.textcontainer}>

                <h2 className={styles.subheading}>PDF viewing</h2>

                <p className={styles.description}>
                    The next step was allowing a administrative user to view the PDFs that were uploaded.
                </p>

                <p className={styles.description}>
                    I began by making two pages, one for the registration as an admin and one for logging in as an admin, these pages were designed to be used as authoristion into the projects.php page 
                    but I still need to implement the session code.
                </p>

                <div className={styles.code} >
                    <GithubGist
                        url="https://gist.github.com/Chuccle/2c33bf6a19f94a57435bb7eb34c06b64"
                        Loading={() => <p>Loading...</p>}>
                    </GithubGist>
                </div>

                <p className={styles.description}>
                    The last part of the project was the projects.php page, this would display the name of the PDFs registered inside the database, and allow the user to view the PDF.
                </p>

                <div className={styles.code} >
                    <GithubGist
                        url="https://gist.github.com/Chuccle/bcea2fcbd971ef8dac213f22f77be3e4"
                        Loading={() => <p>Loading...</p>}>
                    </GithubGist>
                </div>

        
            
            </div>

            <div className={styles.textcontainer}>
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
