import styles from "/styles/Home.module.css";
import React, { useState } from "react";
import Link from "next/link";

export default function Sidebar(): JSX.Element {

  const [sidebarActive, SetSidebarActive] = useState(false);

  return (
    <>
      <div
        className={styles.SidebarBtn}
        onClick={
          sidebarActive
            ? () => SetSidebarActive(false)
            : () => SetSidebarActive(true)
        }
      >
        &#9776;
      </div>
      <div className={sidebarActive ? styles.Sidebar : styles.SidebarInvis}>
        <div className={styles.SidebarElementContainer}>
          <div className={styles.SidebarElement}>
            <Link href="/">
              Home
            </Link>
          </div>
          <div className={styles.SidebarElement}>
            <Link href="/contact">
              Contact
            </Link>
          </div>
          <div className={styles.SidebarElement}>
            <Link href="/About">
              About
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}