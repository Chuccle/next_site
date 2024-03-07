"use client";

import dynamic from "next/dynamic";
import Image from "next/image";

import styles from "@/Projects.module.css";

const ReactEmbedGist = dynamic(
  () => import("react-embed-gist"),
  { ssr: false }
);

export default function Page (): React.ReactNode {
  return (
    <div>
      <h1 className={styles.title}>
        The making of TaxiApp
      </h1>
      <div className={styles.imagecontainer}>
        <Image
          alt='taxiapp appointment maker'
          width={2560}
          height={1340}
          className={styles.appimg}
          src='/Site_Assets/taxiapp.png'
        />
      </div>
      <div className={styles.textcontainer}>
        <h2 className={styles.subheading}>
          Introduction
          {" "}
        </h2>
        <p className={styles.description}>
          This project was designed for a taxi company and was made to
          help them organise their appointments and to make quotes for
          their customers.
        </p>
        <p className={styles.description}>
          The project was developed in Kotlin and was made using the
          Android Studio IDE.
        </p>
        <p className={styles.description}>
          When consulting with the company, they wanted to make a
          mobile app that would:
        </p>
        <ul className={styles.description}>
          <li>
            Have flexibility with their rates.
          </li>
          <li>
            Integrate into the Android calender provider.
          </li>
          <li>
            Would calculate the time of the estimated journey.
          </li>
          <li>
            Would calculate the charge of the estimated journey.
          </li>
        </ul>
        <h2 className={styles.subheading}>
          Settings page
          {" "}
        </h2>
        <p className={styles.description}>
          The first page I developed for the app was the settings
          page. This page allows the user to set their own rates in
          either imperial or metric units.
        </p>
        <p className={styles.description}>
          The unit toggle button also converts the current value into
          it&apos;s metric equivalent and vice versa.
          <br />
          {" "}
          A charge of £1 per kilometer would be converted to
          £1.61 per mile. (1mi = 1.61km)
        </p>
        <div className={styles.code}>
          <ReactEmbedGist
            gist='Chuccle/9e2a1c15840dfc7a35436ca48e30b3ba'
          />
        </div>
        <p className={styles.description}>
          The value of the textbox and the active unit type is then
          saved into the local storage via sharedPreferences. Later
          referenced inside our APIs.
        </p>
      </div>
      <div className={styles.textcontainer}>
        <h2 className={styles.subheading}>
          Appointments page
        </h2>
        <p className={styles.description}>
          The next step in the development of the app was the
          appointments page. This page allows the user to fill in the
          details of their appointment which would then be calculated
          and saved as an event in the Android calendar.
        </p>
      </div>
      <div className={styles.textcontainer}>
        <p className={styles.description}>
          To accurately gather details of the destination and pickup
          location, the app uses the Places autocomplete API, this
          guarantees that the user will be able to select a valid
          location and provides accuracy to be later used in the
          Distance matrix API.
        </p>
        <p className={styles.description}>
          The user will first be prompted to select a pickup location
          and then a destination location from a Google places
          autocomplete fragmentview component, the chosen location is
          then stored as a variable.
        </p>
        <p className={styles.description}>
          Provided the user has filled out the other fields and they
          pass the validation checks, the app will then use location
          services to calculate the current location of the user.
        </p>
        <p className={styles.description}>
          The app then uses the Distance matrix API to calculate the
          distance and time between the current location to the pickup
          location and the pickup location to the destination location
          in either metric or imperial based on the sharedPreferences.
        </p>
        <p className={styles.description}>
          The app then uses an intent to launch the calenderProvider
          to create an event in the calendar using the details of the
          appointment and append a suggested price based on the
          distance and the rate with the time being the duration of
          the event.
        </p>
      </div>
      <div className={styles.textcontainer}>
        <p className={styles.description}>
          Full code available -{" "}
          <a href='https://github.com/Chuccle'>
            <svg
              height='32'
              aria-hidden='true'
              viewBox='0 0 16 16'
              version='1.1'
              width='32'
              data-view-component='true'
              fill='white'
            >
              <path
                fillRule='evenodd'
                d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z'
              />
            </svg>
          </a>
        </p>
      </div>
    </div>
  );
}
