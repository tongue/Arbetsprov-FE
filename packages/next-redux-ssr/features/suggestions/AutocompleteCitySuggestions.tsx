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

  return (
    <div>
      <ActionForm actionType={fetchSuggestionsActionType}>
        <label {...autocomplete.getLabelProps()}>Find city:</label>
        <div {...autocomplete.getComboboxProps()}>
          <input
            name="cityName"
            type="text"
            {...autocomplete.getInputProps()}
          />
          <button
            type="submit"
            name="suggestionsMenu"
            value="open"
            {...autocomplete.getToggleButtonProps()}
          >
            Find
          </button>
          {status === "loading" ? <span>loading...</span> : undefined}
        </div>
      </ActionForm>
      <ol {...autocomplete.getMenuProps()}>
        {autocomplete.isOpen &&
          items.map((item, index) => (
            <li
              key={item.id}
              {...autocomplete.getItemProps({ item, index })}
              style={
                isHighlighted(index)
                  ? { backgroundColor: "hotpink" }
                  : undefined
              }
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
