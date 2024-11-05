export interface User {
  id: number; // Asumiendo que id es un número
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  username: string;
  password?: string; // Generalmente, no se incluye en el frontend por razones de seguridad
  role?: string; // Se puede usar un string literal para limitar los roles posibles
}
