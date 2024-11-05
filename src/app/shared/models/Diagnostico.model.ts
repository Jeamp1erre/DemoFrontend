import { Consulta } from './Consulta.model';
import { Tratamiento } from './Tratamiento.models';

export interface Diagnostico {
  id: number;
  nombreDoctor: string;
  descripcionDiagnostico: string;
  consulta: Consulta;
  tratamientos: Tratamiento[];
}
