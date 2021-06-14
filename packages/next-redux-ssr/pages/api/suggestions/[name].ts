import type { NextApiRequest, NextApiResponse } from "next";
import { getGeoCities } from "../../../api";
import { isString } from "../../../utils";
import hash from "object-hash";
import { City, CityId } from "../../../features/cities/citiesSlice";

export const generateCityId = (name: string, country: string): CityId =>
  hash([name.trim().toUpperCase(), country.trim().toUpperCase()]);

export const decodeCity = ({ name, country }: GeoCity): City => ({
  id: generateCityId(name, country),
  name,
  country,
});

export type CityResponse = City[] | { message: string };

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CityResponse>
): Promise<void> {
  const { name } = req.query;
  try {
    const response = await getGeoCities(isString(name) ? name : undefined);
    const cities = response.data.data.map(decodeCity);
    res.status(200).json(cities);
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "Could not find city" });
  }
}

export default handler;
