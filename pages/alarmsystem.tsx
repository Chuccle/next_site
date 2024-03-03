import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Projects.module.css';
import dynamic from 'next/dynamic';

const GithubGist = dynamic(
    () => {
        return import('react-gistlab').then((module) => ({ default: module.GithubGist }));
    },
    { ssr: false }
);

export default function AlarmSystem(): JSX.Element {
    return (
        <div>
            <Head>
                <title>The making of the alarm system</title>
                <link rel="icon" type="image/svg+xml" href="favicon.svg" />
            </Head>

            <h1 className={styles.title}>The making of alarm system</h1>

            <div className={styles.imagecontainer}>
                <Image
                    alt="alarm system project logic diagram"
                    width={2560}
                    height={1340}
                    className={styles.appimg}
                    src={'/Site_Assets/AlarmSystem.png'}
                />
            </div>
            <div className={styles.textcontainer}>
                <h2 className={styles.subheading}>Introduction </h2>
                <p className={styles.description}>
                    This was my foray into embedded systems, in this solution I
                    was constrained to using a BBC Microbit; a SOC device
                    without network connectivity of any kind. Another constraint
                    was that I had to send an email alert to a the alarm&apos;s
                    owner when the alarm was triggered. This device was designed
                    to be used as a smart alarm, and as such it had a few
                    features:
                </p>
                <ul className={styles.description}>
                    <li>Should be linked to an account</li>
                    <li>
                        Should query a database for when it should be active
                    </li>
                    <li>
                        The user should be able to interface with the database
                    </li>
                </ul>

                <h2 className={styles.subheading}>Microbit programming </h2>
                <p className={styles.description}>
                    The project was challenging especially as I learned that the
                    Microbit comes with very few features. As such, I decided to
                    purchase a kit with a breadboard and a few other components
                    including a Infrared sensor. I had to first test the
                    circuit, I programmed the Microbit to produce an LED output
                    if it detected a signal from the sensor. After that I then
                    inspected the Microbit&apos;s IO.
                </p>
                <div className={styles.code}>
                    <GithubGist
                        url="https://gist.github.com/Chuccle/412dab90c67d549c5756c16983360107"
                        Loading={() => <p>Loading...</p>}
                    ></GithubGist>
                </div>
                <p className={styles.description}>
                    The Microbit has Bluetooth, RF and USB interfaces. I decided
                    I didn&apos;t want to use wireless signals because the
                    device I would have to connect to the Microbit as a proxy
                    may not have a Bluetooth module.
                </p>
                <div className={styles.imagecontainer}>
                    <Image
                        alt="BBC Microbit diagram"
                        width={2560}
                        height={1340}
                        className={styles.appimg}
                        src={'/Site_Assets/microbit.png'}
                    />
                </div>
            </div>
            <div className={styles.textcontainer}>
                <h2 className={styles.subheading}>Network proxy</h2>
                <p className={styles.description}>
                    The next step was to find a way around the lack of network
                    connectivity of the Microbit. I decided to use a network
                    proxy, which is a device that sits between the Microbit and
                    the Internet. The proxy could be any device really, but I
                    decided to use a Raspberry Pi. The Raspberry pi is a
                    low-power small device that does have network connectivity
                    via WIFI or ethernet.
                </p>
            </div>
            <div className={styles.textcontainer}>
                <p className={styles.description}>
                    I could have easily coded the PI in Python with the
                    Micropython library but this language is rather taxing on
                    resources. I decided to use C++ instead. The C++ code is a
                    bit more complex, but at it&apos;s peak usage it only
                    consumes 4MB of memory, which is a lot less than a python
                    script.
                </p>

                <p className={styles.description}>
                    I ended up using a few libraries to make my program work
                    including:
                </p>

                <ul className={styles.description}>
                    <li>Poco</li>
                    <li>Boost</li>
                    <li>CPR</li>
                </ul>

                <p className={styles.description}>
                    There are two conditions determining whether an email should
                    be sent:
                </p>

                <ul className={styles.description}>
                    <li>Signal from Microbit</li>
                    <li>The active time</li>
                </ul>

                <div className={styles.code}>
                    <GithubGist
                        url="https://gist.github.com/Chuccle/0251af110841e768c1a11cabc8b17639"
                        Loading={() => <p>Loading...</p>}
                    ></GithubGist>
                </div>

                <p className={styles.description}>
                    The active time is determined by the user and stored in the
                    database where the Microbit can regularly request it.
                </p>

                <div className={styles.code}>
                    <GithubGist
                        url="https://gist.github.com/Chuccle/313a7e0e0ace77938d010fd42a09465a"
                        Loading={() => <p>Loading...</p>}
                    ></GithubGist>
                </div>

                <p className={styles.description}>
                    Throughout my code i was sure to implement resource
                    optimisation, by using const reference variables as
                    arguments for more expensive primitive types. This was done
                    to prevent the program from creating a deep copy of the data
                    which would have taken up a lot of memory.
                </p>

                <p className={styles.description}>
                    Lastly, I decided to include an ID system into the proxy
                    program.
                </p>

                <ul className={styles.description}>
                    <li>
                        This ID is designed to be created using a UUID v4
                        algorithm.
                    </li>
                    <li>
                        The ID is then stored in the database and the Microbit
                        can request it.
                    </li>
                </ul>

                <p className={styles.description}>
                    This way we can guarantee that the each system can be
                    uniquely identified and makes it much harder for anyone to
                    guess the ID.
                </p>

                <h2 className={styles.subheading}>Server</h2>
                <p className={styles.description}>
                    The first step was to establish a server. I decided to make
                    my server in Rust using the Actix framework, learning from
                    my Node.js experience; I decided to use an Object Relational
                    Mapper (ORM) in the from of Diesel.
                </p>
                <p className={styles.description}>
                    For my database I used Postgres, which was fast, reliable
                    and easy to use. <br /> I was able to quickly and easily
                    setup the schema and normalise the data, I then ran the
                    Migrations and Diesel setup process.
                </p>
                <div className={styles.code}>
                    <GithubGist
                        url="https://gist.github.com/Chuccle/b69cdc72e2739d10db095fe795a49a47"
                        Loading={() => <p>Loading...</p>}
                    ></GithubGist>
                </div>
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
