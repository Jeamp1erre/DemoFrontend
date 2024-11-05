import { Diagnostico } from './Diagnostico.model';

export interface Tratamiento {
  id: number;
  descripcionTratamiento: string;
  duracionDias: number;
  diagnostico: Diagnostico;
}
