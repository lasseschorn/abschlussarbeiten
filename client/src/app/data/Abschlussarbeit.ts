import { Student } from './Student';
import { Dozent } from './Dozent';
import { Betreuer } from './Betreuer';

export class Abschlussarbeit {

arbeitsID: number;
titel: string;
datum: Date;
beschreibung: string;
abstract: string;
student: Student;
dozent: Dozent;
betreuer: Betreuer;

}
