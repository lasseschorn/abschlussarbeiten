import { Person } from './Person';
import { AkaGrad } from './AkaGrad';
import { Studiengang } from './Studiengang';
import { Abschlussarbeit } from './Abschlussarbeit';

export class Student {

  person: Person;
  matrikelnummer: number;
  akaGrad: AkaGrad;
  studiengang: Studiengang;
  abschlussarbeit: Abschlussarbeit;

}
