import Head from "next/head";
import styles from "../styles/Projects.module.css";
import { GithubGist } from "react-gistlab";



export default function PHPSite(): JSX.Element {

    return (
        <div>
            <Head>
                <title>The making of my portfolio</title>
                <link rel="icon" type="image/svg+xml" href="favicon.svg" />
            </Head>

            <h1 className={styles.title}>The making of my portfolio</h1>

            <div className={styles.imagecontainer}>
                <img className={styles.quizappimg} src={"/Site_Assets/next_site.png"} />
            </div>
            <div className={styles.textcontainer}>

                <h2 className={styles.subheading}>Introduction</h2>

                <p className={styles.description}>
                    I decided to create my portfolio using some of the bleeding edge technologies. From the get go I had desperately wanted 
                    to use THREE.js.  
                </p>

                <p className={styles.description}>
                    Initially I had only planned to make a spinning Earth but as the project went on I became more ambitious and added more models, animations and effects.
                </p>

                <p className={styles.description}>
                I also wanted the site to be responsive and mobile friendly which beforehand in other projects was always an afterthought and could be implemented better.
                </p>

                <h2 className={styles.subheading}>Zoom out issues</h2>

                <p className={styles.description}>
                Fairly early on I encountered my first issue with the zoom out feature. If the viewport was too thin then some of the models would be clipped off leading to a poor quality looking scene. 

                I ended up solving this by creating an algorithm which dynamically adjusts the field of view based on the value of the aspect ratio.
                </p>

                <div className={styles.code} >
                    <GithubGist
                        url="https://gist.github.com/Chuccle/1a4596b7cd114b4eda458ba4153abdf8"
                        Loading={() => <p>Loading...</p>}>
                    </GithubGist>
                </div>


            </div>

            <div className={styles.textcontainer}>

                <h2 className={styles.subheading}>Orbit algorithm</h2>

                <p className={styles.description}>
                   After creating a moon mesh, I had to create an algorithm to rotate the Moon around the Earth. It needed to be far away enough to not clip into the Earth.
                </p>



                <div className={styles.code} >
                    <GithubGist
                        url="https://gist.github.com/Chuccle/48f44ec845d6909210a5e5bf674f0600"
                        Loading={() => <p>Loading...</p>}>
                    </GithubGist>
                </div>

                <p className={styles.description}>
                    Ultimately, I made use of useRef hooks when storing the dynamic values of the orbit algorithm in order to avoid the need for a rerender which would have grave performance implications.
                </p>
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
