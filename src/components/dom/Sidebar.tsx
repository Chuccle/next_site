import Link from "next/link";
import React, { useState } from "react";

import styles from "@/Home.module.css";

export default function Sidebar(): React.ReactNode {
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
      <div
        className={sidebarActive ? styles.Sidebar : styles.SidebarInvis}
      >
        <div className={styles.SidebarElementContainer}>
          <div className={styles.SidebarElement}>
            <Link href='/'>
              Home
            </Link>
          </div>
          <div className={styles.SidebarElement}>
            <Link href='/resume'>
              CV
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
