import { Paciente } from './Paciente.model';
import { Diagnostico } from './Diagnostico.model';

export interface Consulta {
  id: number;
  fechaConsulta: Date;
  motivoConsulta: string;
  paciente: Paciente;
  diagnosticos: Diagnostico[];
}
