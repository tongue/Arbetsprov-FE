import { Meta } from "@storybook/react";
import weatherCard from "../modules/weather-card";
import { SunIcon, SnowIcon, CloudIcon } from "..";

export default {
  title: "Modules/weatherCard",
} as Meta;

export const Hot = () => {
  const styles = weatherCard({ temperature: "hot" });
  return (
    <article className={styles.block}>
      <header className={styles.city}>
        <h2 className={styles.heading}>
          Rio de Janeiro <span className={styles.country}>Brazil</span>
        </h2>
      </header>
      <div className={styles.temperature}>
        26
        <abbr
          className={styles.temperatureUnit}
          title="Degrees Celsius"
        >{`°`}</abbr>
      </div>
      <figure className={styles.icon}>
        <SunIcon />
      </figure>
    </article>
  );
};

export const Lukewarm = () => {
  const styles = weatherCard({ temperature: "lukewarm" });
  return (
    <article className={styles.block}>
      <header className={styles.city}>
        <h2 className={styles.heading}>
          Amsterdam <span className={styles.country}>Netherlands</span>
        </h2>
      </header>
      <div className={styles.temperature}>
        16
        <abbr
          className={styles.temperatureUnit}
          title="Degrees Celsius"
        >{`°`}</abbr>
      </div>
      <figure className={styles.icon}>
        <CloudIcon />
      </figure>
    </article>
  );
};

export const Cold = () => {
  const styles = weatherCard({ temperature: "cold" });
  return (
    <article className={styles.block}>
      <header className={styles.city}>
        <h2 className={styles.heading}>
          Stockholm <span className={styles.country}>Sweden</span>
        </h2>
      </header>
      <div className={styles.temperature}>
        -6
        <abbr
          className={styles.temperatureUnit}
          title="Degrees Celsius"
        >{`°`}</abbr>
      </div>
      <figure className={styles.icon}>
        <SnowIcon />
      </figure>
    </article>
  );
};
