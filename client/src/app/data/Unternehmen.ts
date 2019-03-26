import { Rechtsform } from './Rechtsform';
import { Adresse } from './Adresse';
import { Branche } from './Branche';

export class Unternehmen {

  id: number;
  name: string;
  rechtsform: Rechtsform;
  adresse: Adresse;
  branche: Branche;
}
