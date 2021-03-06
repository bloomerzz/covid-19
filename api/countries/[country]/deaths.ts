import { NowResponse, NowRequest } from "@now/node";

import {
  fetchFeatures,
  attributeSpreader,
  normalizeKeys,
  matchCountryCode,
  getIso3Code
} from "../../../util/data";
import { queryDeaths } from "../../../util/query";
import { getCountryName } from "../../../util/countries";
import { getEndpoint } from "../../../util/endpoints";

export default async (req: NowRequest, response: NowResponse) => {
  try {
    response.json(
      (
        await fetchFeatures(
          getEndpoint(req.query.level as string),
          queryDeaths(getCountryName(req.query.country as string))
        )
      )
        .map(attributeSpreader)
        .map(normalizeKeys)
        .map(matchCountryCode)
        .map(getIso3Code)
    );
  } catch (error) {
    response.statusCode = 404;
    response.json([]);
  }
};
