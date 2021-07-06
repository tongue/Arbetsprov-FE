import React, { useCallback } from "react";
import {
  fetchSuggestionsActionType,
  useSuggestions,
  useSuggestionsActions,
} from "./suggestionsSlice";
import {
  fetchWeatherForCityActionType,
  useWeatherActions,
} from "../weather/weatherSlice";
import ActionButton from "../../components/ActionButton";
import ActionForm from "../../components/ActionForm";
import { useServerSideAction } from "../../hooks/ssr";
import { hasLength } from "../../utils";
import { debounce } from "lodash";
import { useCombobox } from "downshift";
import { autocomplete as autocompleteStyles, AddIcon } from "@isotop/kit";

const Autocomplete = (): JSX.Element => {
  const { items, status } = useSuggestions();
  const suggestions = useSuggestionsActions();
  const weather = useWeatherActions();

  const [isFetchSuggestion, [cityName, suggestionsMenu]] = useServerSideAction(
    fetchSuggestionsActionType,
    ["cityName", "suggestionsMenu"]
  );

  // Memoized with useCallback, so that we ensure that the same function
  // is beeing called after on re-renders. Otherwise `debounce` wont work.
  const onInputValueChange = useCallback(
    // Debounce the function for 1s, since thats our API rate limit
    debounce(
      ({ inputValue }) =>
        hasLength(inputValue)
          ? suggestions.fetch(inputValue)
          : suggestions.clear(),
      1000
    ),
    []
  );

  const autocomplete = useCombobox({
    id: "autocomplete-cities",
    items,
    itemToString: () => "",
    onInputValueChange,
    onSelectedItemChange: ({ selectedItem }) =>
      weather.fetchForCity(selectedItem),
    defaultInputValue: isFetchSuggestion ? cityName : "",
    defaultIsOpen: suggestionsMenu === "open" && isFetchSuggestion,
  });

  const isHighlighted = (index: number): boolean =>
    autocomplete.highlightedIndex === index;

  const styles = autocompleteStyles({ status });

  return (
    <div className={styles.block}>
      <ActionForm
        className={styles.comboBox}
        actionType={fetchSuggestionsActionType}
        {...autocomplete.getComboboxProps()}
      >
        <label className={styles.label} {...autocomplete.getLabelProps()}>
          Location:
        </label>
        <input
          className={styles.input}
          name="cityName"
          type="text"
          {...autocomplete.getInputProps()}
        />
        <button
          className={styles.button}
          type="submit"
          name="suggestionsMenu"
          value="open"
          aria-label="Add"
          {...autocomplete.getToggleButtonProps()}
        >
          <figure>
            <AddIcon />
          </figure>
        </button>
      </ActionForm>
      <ol className={styles.menu} {...autocomplete.getMenuProps()}>
        {autocomplete.isOpen &&
          items.map((item, index) => (
            <li
              className={styles.menuItem(isHighlighted(index))}
              key={item.id}
              {...autocomplete.getItemProps({ item, index })}
            >
              <ActionButton
                actionType={fetchWeatherForCityActionType}
                values={item}
              >
                {`${item.name}, ${item.country}`}
              </ActionButton>
            </li>
          ))}
      </ol>
    </div>
  );
};

export default Autocomplete;
