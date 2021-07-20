import { Meta } from "@storybook/react";
import { AddIcon } from "../assets/icons";
import autocomplete from "../modules/autocomplete";

export default {
  title: "Modules/autocomplete",
} as Meta;

export const Idle = () => {
  const styles = autocomplete({});

  return (
    <div className={styles.block}>
      <form className={styles.comboBox}>
        <label className={styles.label}>Location:</label>
        <input className={styles.input} name="cityName" type="text" />
        <button
          className={styles.button}
          type="submit"
          name="suggestionsMenu"
          value="open"
        >
          <figure>
            <AddIcon />
          </figure>
        </button>
      </form>
      <ol className={styles.menu}></ol>
    </div>
  );
};

export const Loading = () => {
  const styles = autocomplete({ status: "loading" });

  return (
    <div className={styles.block}>
      <form className={styles.comboBox}>
        <label className={styles.label}>Location:</label>
        <input className={styles.input} name="cityName" type="text" />
        <button
          className={styles.button}
          type="submit"
          name="suggestionsMenu"
          value="open"
        >
          <figure>
            <AddIcon />
          </figure>
        </button>
      </form>
      <ol className={styles.menu}></ol>
    </div>
  );
};

export const Succeeded = () => {
  const styles = autocomplete({ status: "succeeded" });

  return (
    <div className={styles.block}>
      <form className={styles.comboBox}>
        <label className={styles.label}>Location:</label>
        <input className={styles.input} name="cityName" type="text" />
        <button
          className={styles.button}
          type="submit"
          name="suggestionsMenu"
          value="open"
        >
          <figure>
            <AddIcon />
          </figure>
        </button>
      </form>
      <ol className={styles.menu}>
        <li className={styles.menuItem}>
          <button>Stockholm, Sweden</button>
        </li>
        <li className={styles.menuItemActive}>
          <button>Amsterdam, Netherlands</button>
        </li>
        <li className={styles.menuItem}>
          <button>Rio de Janerio, Brazil</button>
        </li>
      </ol>
    </div>
  );
};
