import Image from 'next/image';
import Link from 'next/link';
import styles from '/styles/Home.module.css';
import SolarSystemComposer from '../components/space';

export default function App(): JSX.Element {
    return (
        <div>
            <div className={styles.background3D}>
            <SolarSystemComposer styles={styles} />
            </div>
            <section className={styles.accent}>
                <Image
                    src="/Site_Assets/Spaceman.png"
                    alt="Picture of the author"
                    width={'250'}
                    height={'250'}
                />

                <div className={styles.Introbox}>
                    <h1 className={styles.IntroTitleText}>
                        Hi, my name is Charlie
                    </h1>

                    <p className={styles.IntroText}>
                        I am a software developer that is always pushing the
                        boundaries on what is possible.
                        <br />I love to learn new things and I am always looking
                        for new ways to improve my skills.
                    </p>
                </div>
            </section>

            <section className={styles.background}>
                <div className={styles.box}>
                    <div className={styles.section1}>
                        <Image
                            className={styles.section1Icon}
                            src={'/Site_Assets/Icon.svg'}
                            alt="icon"
                            width={100}
                            height={100}
                        />

                        <h1 className={styles.boxTitleText}>
                            Front-end Development
                        </h1>

                        <p className={styles.boxText}>
                            I am a developer with a passion for building
                            beautiful and functional websites and software.
                        </p>

                        <h2 className={styles.subheading}>Languages</h2>

                        <p className={styles.boxText}>
                            Javascript, Typescript, HTML, CSS, Sass
                        </p>

                        <h2 className={styles.subheading}>
                            Frameworks and technologies{' '}
                        </h2>

                        <ul
                            className={styles.boxText}
                            style={{ listStyle: 'none', marginLeft: '0' }}
                        >
                            <li style={{ marginTop: '1rem' }}>React.js</li>
                            <li style={{ marginTop: '1rem' }}>Next.js</li>
                            <li style={{ marginTop: '1rem' }}>Tailwind</li>
                            <li style={{ marginTop: '1rem' }}>Bootstrap</li>
                            <li style={{ marginTop: '1rem' }}>
                                Three.js/WebGL
                            </li>
                        </ul>
                    </div>

                    <div className={styles.section2}>
                        <Image
                            className={styles.section1Icon}
                            src={'/Site_Assets/html2.svg'}
                            alt="icon"
                            width={100}
                            height={100}
                        />

                        <h1 className={styles.boxTitleText}>
                            Application Architecture{' '}
                        </h1>

                        <p className={styles.boxText}>
                            Designing software stacks and designing and
                            researching into solutions.
                        </p>

                        <h2 className={styles.subheading}>
                            Platforms I create for
                        </h2>

                        <p className={styles.boxText}>
                            Web, Mobile, Desktop, IoT and more.
                        </p>

                        <h2 className={styles.subheading}>
                            Machine to Machine connections{' '}
                        </h2>

                        <p className={styles.boxText}>
                            Understanding how to connect machines and how to
                            communicate between them wirelessly or wired.
                        </p>

                        <h2 className={styles.subheading}>Security </h2>

                        <ul
                            className={styles.boxText}
                            style={{ listStyle: 'none', marginLeft: '0' }}
                        >
                            <li style={{ marginTop: '1rem' }}>
                                Understanding of vulnerabilities and secure
                                solutions
                            </li>
                            <li style={{ marginTop: '1rem' }}>
                                OWASP best practices, security testing, and
                                security reviews
                            </li>
                            <li style={{ marginTop: '1rem' }}>
                                Encryption and hashing of sensitive data
                            </li>
                        </ul>
                    </div>

                    <div className={styles.section3}>
                        <Image
                            className={styles.section1Icon}
                            src={'/Site_Assets/html3.svg'}
                            alt="icon"
                            width={100}
                            height={100}
                        />

                        <h1 className={styles.boxTitleText}>
                            Back-end Development
                        </h1>

                        <p className={styles.boxText}>
                            Efficient and Normalised databases, performant and
                            scalable APIs and microservices.
                        </p>

                        <h2 className={styles.subheading}>Languages </h2>

                        <p className={styles.boxText}>
                            Rust, Node.js, SQL, JSON, PHP
                        </p>

                        <h2 className={styles.subheading}>
                            Frameworks and technologies
                        </h2>
                        <ul
                            className={styles.boxText}
                            style={{ listStyle: 'none', marginLeft: '0' }}
                        >
                            <li style={{ marginTop: '1rem' }}>Express.js</li>
                            <li style={{ marginTop: '1rem' }}>PostgreSQL</li>
                            <li style={{ marginTop: '1rem' }}>MySQL</li>
                            <li style={{ marginTop: '1rem' }}>Actix</li>
                            <li style={{ marginTop: '1rem' }}>Diesel</li>
                            <li style={{ marginTop: '1rem' }}>Node.js</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section>
                <div className={styles.container}>
                    <h1 className={styles.ProjectSectionTitleText}>
                        My projects
                    </h1>
                    <p className={styles.IntroText}>
                        Here are some projects I have created
                    </p>

                    <div className={styles.projectgrid}>
                        <div className={styles.card1}>
                            <div className={styles.gridthumb}>
                                <Image
                                    sizes="100%"
                                    width={0}
                                    height={0}
                                    src={'/Site_Assets/qal1.png'}
                                    alt={'link to Quizapp deep dive'}
                                    style={{
                                        borderRadius: '1rem',
                                        minWidth: '100%',
                                        minHeight: '100%',
                                    }}
                                />
                            </div>
                            <div
                                className={styles.overlay}
                                style={{ backgroundColor: '#a47ce4' }}
                            >
                                <p className={styles.caption}>
                                    A fully-featured web application for
                                    creating and playing quizzes.
                                </p>
                                <Link href="/quizapp" passHref>
                                    <p className={styles.button}>See more</p>
                                </Link>
                            </div>
                        </div>

                        <div className={styles.card2}>
                            <div className={styles.gridthumb}>
                                <Image
                                    sizes="100%"
                                    width={0}
                                    height={0}
                                    src={'/Site_Assets/asl4.png'}
                                    alt={'link to Alarm system deep dive'}
                                    style={{
                                        borderRadius: '1rem',
                                        minWidth: '100%',
                                        minHeight: '100%',
                                    }}
                                />
                            </div>
                            <div
                                className={styles.overlay}
                                style={{ backgroundColor: '#104f6c' }}
                            >
                                <p className={styles.caption}>
                                    A program to make smart alarms which send
                                    emails as alerts.
                                </p>
                                <Link href="/alarmsystem" passHref>
                                    <p className={styles.button}>See more</p>
                                </Link>
                            </div>
                        </div>

                        <div className={styles.card3}>
                            <div className={styles.gridthumb}>
                                <Image
                                    sizes="100%"
                                    width={0}
                                    height={0}
                                    src={'/Site_Assets/tal2.png'}
                                    alt={'link to Taxiapp deep dive'}
                                    style={{
                                        borderRadius: '1rem',
                                        minWidth: '100%',
                                        minHeight: '100%',
                                    }}
                                />
                            </div>
                            <div
                                className={styles.overlay}
                                style={{ backgroundColor: '#fbdb34' }}
                            >
                                <p
                                    className={styles.caption}
                                    style={{ color: 'black' }}
                                >
                                    An Android app which works organises taxi
                                    appointments.
                                </p>
                                <Link href="/taxiapp" passHref>
                                    <p
                                        className={styles.button}
                                        style={{
                                            color: 'black',
                                            borderColor: 'black',
                                        }}
                                    >
                                        See more
                                    </p>
                                </Link>
                            </div>
                        </div>

                        <div className={styles.card1}>
                            <div className={styles.gridthumb}>
                                <Image
                                    sizes="100%"
                                    width={0}
                                    height={0}
                                    src={'/Site_Assets/cral2.png'}
                                    alt={'link to Rental app deep dive'}
                                    style={{
                                        borderRadius: '1rem',
                                        minWidth: '100%',
                                        minHeight: '100%',
                                    }}
                                />
                            </div>
                            <div
                                className={styles.overlay}
                                style={{ backgroundColor: 'gray' }}
                            >
                                <p className={styles.caption}>
                                    A desktop app which calculates the cost of a
                                    car and exports it
                                </p>
                                <Link href="/carrentalapp" passHref>
                                    <p className={styles.button}>See more</p>
                                </Link>
                            </div>
                        </div>

                        <div className={styles.card2}>
                            <div className={styles.gridthumb}>
                                <Image
                                    sizes="100%"
                                    width={0}
                                    height={0}
                                    src={'/Site_Assets/phpl.png'}
                                    alt={'link to PHP website deep dive'}
                                    style={{
                                        borderRadius: '1rem',
                                        minWidth: '100%',
                                        minHeight: '100%',
                                    }}
                                />
                            </div>
                            <div
                                className={styles.overlay}
                                style={{ backgroundColor: '#06abba' }}
                            >
                                <p className={styles.caption}>
                                    A website which allows users to upload their
                                    CVs to a database
                                </p>
                                <Link href="/phpsite" passHref>
                                    <p className={styles.button}>See more</p>
                                </Link>
                            </div>
                        </div>

                        <div className={styles.card3}>
                            <div className={styles.gridthumb}>
                                <Image
                                    sizes="100%"
                                    width={0}
                                    height={0}
                                    src={'/Site_Assets/next_site.png'}
                                    alt={'link to portfolio website deep dive'}
                                    style={{
                                        borderRadius: '1rem',
                                        minWidth: '100%',
                                        minHeight: '100%',
                                    }}
                                />
                            </div>
                            <div
                                className={styles.overlay}
                                style={{ backgroundColor: '#000' }}
                            >
                                <p className={styles.caption}>
                                    A website which shows WebGL graphics and
                                    animation{' '}
                                </p>
                                <Link href="/nextsite" passHref>
                                    <p className={styles.button}>See more</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
