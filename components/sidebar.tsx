import styles from "/styles/Home.module.css";
import React, { useState } from "react";

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
            <a className={styles.SidebarElement} href=".">
              Home
            </a>
            <a className={styles.SidebarElement} href="#news">
              News
            </a>
            <a className={styles.SidebarElement} href="#contact">
              Contact
            </a>
          </div>
        </div>
      </>
    );
  }