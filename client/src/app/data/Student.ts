import { Person } from './Person';
import { AkaGrad } from './AkaGrad';
import { Studiengang } from './Studiengang';
import { Abschlussarbeit } from './Abschlussarbeit';

export class Student {
  gradID: number;
  bezeichnung: string;
  personenID: number;
  vorname: string;
  nachname: string;
  geschlecht: string;
  email: string;
  studiengangID: number;
  studiengang: string;
  kategorieID: number;
  kategorie: string;
  akademischergrad: string;
}
