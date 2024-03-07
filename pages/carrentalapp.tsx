import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Projects.module.css';
import dynamic from 'next/dynamic';

const ReactEmbedGist = dynamic(
    () => {
        return import('react-embed-gist');},
    { ssr: false }
);

export default function CarRentalApp(): JSX.Element {
    return (
        <div>
            <Head>
                <title>The making of the Car rental app</title>
                <link rel="icon" type="image/svg+xml" href="favicon.svg" />
            </Head>

            <h1 className={styles.title}>The making of Car Rental App</h1>

            <div className={styles.imagecontainer}>
                <Image
                    alt="car rental app dialog"
                    width={2560}
                    height={1340}
                    className={styles.appimg}
                    src={'/Site_Assets/rental.png'}
                />
            </div>
            <div className={styles.textcontainer}>
                <h2 className={styles.subheading}>Introduction </h2>

                <p className={styles.description}>
                    This was project was designed for a theoretical scenario of
                    a car rental company, the app originally was a submission
                    for a college project. Later on, I became disatisfied with
                    the project and it&apos;s implementation and began
                    redeveloping it. The app was to be written in Windows Forms.
                </p>

                <p className={styles.description}>
                    The minimum requirements were fairly simple:
                </p>

                <ul className={styles.description}>
                    <li>Should not allow customers under 25</li>
                    <li>
                        Should have a small, medium and large class of vehicles
                    </li>
                    <li>Should have duration of rental </li>
                </ul>

                <p className={styles.description}>
                    Another stipulation was that the app should be written in
                    VB.NET, this was fine since it very similar to C# a language
                    I am familiar with.
                </p>

                <p className={styles.description}>
                    I of course added features i felt were integral to such an
                    app including: data validation, cost caculation algorithms
                    and a export of the data to a text file.
                </p>

                <h2 className={styles.subheading}>Redevelopment </h2>

                <p className={styles.description}>
                    Initially, the app had plenty of duplicate code and lots of
                    branches, at first I used switch cases to act as jump tables
                    for the branches but it was still messy and inefficient.
                </p>

                <div className={styles.code}>
                    <ReactEmbedGist
                        gist="Chuccle/bda155d8f6002e8ab0bfa37f7bddfd2f"

                    ></ReactEmbedGist>
                </div>
                <p className={styles.description}>
                    I decided that the first matter was to modularise the
                    validation code and make it more readable. I achieved this
                    by making a module called ValidationComponent which held
                    functions that would be referenced in the main code.
                </p>

                <div className={styles.code}>
                    <ReactEmbedGist
                        gist="Chuccle/59b77bbe677fe4e54d2650c76a9ed941"
                    ></ReactEmbedGist>
                </div>

                <p className={styles.description}>
                    A second issue was the public variables scattered about,
                    this would be unmaintainable and violated the principle of
                    encapsulation.
                </p>

                <div className={styles.code}>
                    <ReactEmbedGist
                        gist="Chuccle/529f4f168376debd1bbe841080db21d3"
                    ></ReactEmbedGist>
                </div>

                <p className={styles.description}>
                    I opted to instead use a dictionary with O(1) operations to
                    store the data instead, this worked well too as it was great
                    for exporting to text file with the key-value format.
                </p>

                <p className={styles.description}>
                    Interestingly, the Dictionary interface I used didn&apos;t
                    come with a Add/Update method, so I had to make my own
                    solution.
                </p>

                <div className={styles.code}>
                    <ReactEmbedGist
                        gist="Chuccle/e3cc0abad50d98540cb5b5e0d06c5b9b"

                    ></ReactEmbedGist>
                </div>
            </div>

            <div className={styles.textcontainer}>
                <h2 className={styles.subheading}>Database support</h2>

                <p className={styles.description}>
                    The next step was to move past the rather impractical and
                    crude text file data export and instead export to a SQL
                    database.
                </p>

                <p className={styles.description}>
                    The first thing I did was create a schema. This schema was
                    normalised in such a way that made it more efficient and
                    maintainable, it also offers flexibility to add new classes
                    of vehicles and durations.
                </p>

                <div className={styles.code}>
                    <ReactEmbedGist
                        gist="Chuccle/010e1e5d326f78bed4a9e0b4eb1a1e1e"
                    ></ReactEmbedGist>
                </div>

                <p className={styles.description}>
                    The SQL code was fairly simple, I simply parmeterised all
                    the values inside my dictionary and ran them through
                    queries.
                </p>
            </div>

            <div className={styles.imagecontainer}>
                <Image
                    alt="Car rental app code"
                    width={2560}
                    height={1340}
                    className={styles.appimg}
                    src={'/Site_Assets/rentalapp.png'}
                />
            </div>

            <div className={styles.textcontainer}>
                <p className={styles.description}>
                    Full code available -{' '}
                    <a href="https://github.com/Chuccle">
                        <svg
                            height="32"
                            aria-hidden="true"
                            viewBox="0 0 16 16"
                            version="1.1"
                            width="32"
                            data-view-component="true"
                            fill="white"
                        >
                            <path
                                fillRule="evenodd"
                                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                            ></path>
                        </svg>
                    </a>
                </p>
            </div>
        </div>
    );
}
