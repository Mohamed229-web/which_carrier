import type { CarrierRuleJSON } from "which_carrier";
import postalS10 from "../rules/postal-s10.json";
import colissimo from "../rules/colissimo.json";
import ups from "../rules/ups.json";
import fedex from "../rules/fedex.json";
import dhlExpress from "../rules/dhl-express.json";
import usps from "../rules/usps.json";
import dpd from "../rules/dpd.json";
import gofo from "../rules/gofo-fr.json";
import amazon from "../rules/amazon.json";
import canadaPost from "../rules/canada-post.json";
import landmark from "../rules/landmark.json";
import lasership from "../rules/lasership.json";
import oldDominion from "../rules/old-dominion.json";
import ontrac from "../rules/ontrac.json";

export const seedRules: CarrierRuleJSON[] = [
  postalS10 as CarrierRuleJSON,
  colissimo as CarrierRuleJSON,
  ups as CarrierRuleJSON,
  fedex as CarrierRuleJSON,
  dhlExpress as CarrierRuleJSON,
  usps as CarrierRuleJSON,
  dpd as CarrierRuleJSON,
  gofo as CarrierRuleJSON,
  amazon as CarrierRuleJSON,
  canadaPost as CarrierRuleJSON,
  landmark as CarrierRuleJSON,
  lasership as CarrierRuleJSON,
  oldDominion as CarrierRuleJSON,
  ontrac as CarrierRuleJSON,
];
