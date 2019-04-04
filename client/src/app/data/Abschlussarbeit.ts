import { Kategorie } from './Kategorie';
import { Student } from './Student';
import { Dozent } from './Dozent';
import { Betreuer } from './Betreuer';


export class Abschlussarbeit {
  abstract: string;
  titel: string;
  datum: string;
  kategorieID: number;
  kategorie: string;
  studiengangID: number;
  studiengang: string;
  dozentID: number;
  dozvorname: string;
  doznachname: string;
  unternehmensID: string;
  firmenname: string;
  adressID: number;
  strasse: number;
  hausnummer: string;
  zusatz: string;
  plz: number;
  ort: string;
  studentID: number;
  stuvorname: string;
  stunachname: string;
  arbeitsID: number;
}
