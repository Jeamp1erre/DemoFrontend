export interface RegisterRequest {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  role?: string; // Opcional, puedes establecer un valor por defecto si no se proporciona
}
