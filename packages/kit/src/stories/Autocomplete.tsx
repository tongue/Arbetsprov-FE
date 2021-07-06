import React from "react";
import autocomplete from "../modules/autocomplete";
import { ReactComponent as AddIcon } from "../assets/icons/add.svg";

type Status = "idle" | "loading" | "succeeded" | "failed";

export interface AutocompleteProps {
  status?: Status;
}

const Autocomplete = ({ status = "idle" }: AutocompleteProps) => {
  const styles = autocomplete({ status });

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
        {status === "succeeded" ? (
          <React.Fragment>
            <li className={styles.menuItem}>
              <button>Stockholm, Sweden</button>
            </li>
            <li className={styles.menuItemActive}>
              <button>Amsterdam, Netherlands</button>
            </li>
            <li className={styles.menuItem}>
              <button>Rio de Janerio, Brazil</button>
            </li>
          </React.Fragment>
        ) : undefined}
      </ol>
    </div>
  );
};

export default Autocomplete;
