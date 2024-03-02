import styles from '/styles/Footer.module.css';
import React from 'react';

export default function Footer(): JSX.Element {
    return (
        <div className={styles.pageContainer}>
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
            ></link>
            <div className={styles.contentWrap}></div>
            <footer className={styles.footer}>
                <div className={styles.footerContent}>
                    <p>Copyright &copy; 2024 Charlie Cohen</p>
                    <ul className={styles.ul}>
                        <li>
                            <a href="mailto:charlie11cohen@gmail.com">
                                <i
                                    className="fa fa-envelope"
                                    aria-hidden="true"
                                ></i>
                            </a>
                        </li>
                        <li>
                            <a href="https://linkedin.com/in/charlie-cohen-dev">
                                <i
                                    className="fa fa-linkedin"
                                    aria-hidden="true"
                                ></i>
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com/Chuccle">
                                <i
                                    className="fa fa-github"
                                    aria-hidden="true"
                                ></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </footer>
        </div>
    );
}
