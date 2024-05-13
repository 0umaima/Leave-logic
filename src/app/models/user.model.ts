import { Departement } from "./departement.model";

export interface AppUser {
    userId: string;
    email: string;
    password: string;
    roles : String[];
    jwt?: string
}

export interface Employees {
	id?: number;
	nom: string;
	prenom: string;
	email: string;
  password?: string;
	soldeconge: number;
  role: string;
	departement: Departement;
  jwt?: string;

}

export const EMPLOYEES: Employees[] = [
    {
        id:1052,
        nom: 'Employe',
        prenom: '1',
        email: 'welcomtochillis@gmail.com',
        password: '123456',
        soldeconge: 50,
        role : "HR",
    departement : new Departement(7,"informatique")
    },
    {
      id:205,
      nom: 'john',
      prenom: 'smith',
      email: 'john.smith@exemple.com',
      password: 'john.smith',
      soldeconge: 50,
      role : "HR",
  departement : new Departement(7,"informatique")
  }
]

