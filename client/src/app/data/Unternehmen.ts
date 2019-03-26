import { Rechtsform } from './Rechtsform';
import { Adresse } from './Adresse';
import { Branche } from './Branche';

export class Unternehmen {
unternehmensID: number;
firmenname: string;
rechtsform: Rechtsform;
adresse: Adresse;
branche: Branche;
}
