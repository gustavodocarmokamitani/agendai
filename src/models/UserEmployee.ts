// src/models/Profissional.ts
export interface UserEmployee {
  id: number;
  userId: number;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  active: string;
  serviceIds: number[];
  password: string;
  userTypeId: number;
}

export interface UserEmployeeUpdate {
  id: number;
  employeeId: number; 
  userTypeId: number;
  userId: number;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  active: string;
  serviceIds: number[];
  password: string;
}