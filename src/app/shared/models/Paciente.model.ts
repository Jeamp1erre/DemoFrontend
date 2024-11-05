import { HistoriaMedica } from './HistoriaMedica.model';
import { Consulta } from './Consulta.model';

export interface Paciente {
  id?: number;
  nombre: string;
  apellido: string;
  dni: string;
  fechaNacimiento: Date;
  genero: string;
  telefono: string;
  email: string;
  historiaMedica?: HistoriaMedica;
  consulta?: Consulta[];
}
