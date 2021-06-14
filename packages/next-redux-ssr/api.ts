import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { notUndefined } from "./utils";

export type ApiStatus = "idle" | "loading" | "succeeded" | "failed";

const PROTOCOL = process.env.NODE_ENV === "production" ? "https" : "http";
const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
const API_PORT = process.env.NEXT_PUBLIC_API_PORT;

export const appBase = `${PROTOCOL}://${API_HOST}${
  API_PORT ? `:${API_PORT}` : ""
}`;

// Build an api endpoint url, based on the different arguments passed to the
// function, so that it resembles `path.resolve` in `node`
export const buildLocalEndpoint = (
  ...endpoints: (string | undefined)[]
): string =>
  `${appBase}/${endpoints
    .filter(notUndefined)
    .map((endpoint) => encodeURIComponent(endpoint))
    .join("/")}`;

// Endpoint for suggestions, input can be omitted if you want to go to
// the `POST` endpoint.
export const suggestionsEndpoint = (input?: string): string =>
  buildLocalEndpoint("api", "suggestions", input);

export const weatherEndpoint = (city: string): string =>
  buildLocalEndpoint("api", "weather", city);

// Composed axios request that performs an get to the local API
export const get = async <Type extends unknown>(
  endpoint: string
): Promise<AxiosResponse<Type>> =>
  axios.request<Type, AxiosResponse<Type>>({
    method: "GET",
    url: endpoint,
  });

// Build a configuration object for the API request
export const geoCitiesConfiguration = (input: string): AxiosRequestConfig => ({
  method: "GET",
  url: process.env.RAPID_API_URL,
  params: { limit: "5", minPopulation: "250000", namePrefix: input },
  headers: {
    "x-rapidapi-key": process.env.RAPID_API_KEY,
    "x-rapidapi-host": process.env.RAPID_API_HOST,
  },
});

// Make a axios get call to the geo cities api from rapid, with a name
// as a parameter
export const getGeoCities = async (
  input: string
): Promise<AxiosResponse<GeoCityResponse>> =>
  axios.request<GeoCityResponse>(geoCitiesConfiguration(input));

export const getWeatherStack = async (
  cityCountry: string
): Promise<AxiosResponse<WeatherStackResponse>> =>
  axios.request<WeatherStackResponse>({
    method: "GET",
    url: `${process.env.WEATHERSTACK_API_URL}?access_key=${process.env.WEATHERSTACK_API_KEY}&query=${cityCountry}`,
  });
