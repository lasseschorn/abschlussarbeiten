import { Rechtsform } from './Rechtsform';
import { Adresse } from './Adresse';
import { Branche } from './Branche';

export class Unternehmen {
  branchenID: number;
  branche: string;
  rechtsformID: number;
  rechtsform: string;
  unternehmensID: number;
  firmenname: string;
  adressID: number;
  strasse: string;
  hausnummer: number;
  zusatz: string;
  plz: number;
  ort: string;
}
