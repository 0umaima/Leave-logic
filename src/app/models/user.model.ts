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
    { // currently using this employe because i have it in databse
      // to retrives conge and demandes lists just testing
        id:1052,
        nom: 'Employe',
        prenom: '1',
        email: 'welcomtochillis@gmail.com',
        password: '123456',
        soldeconge: 50,
        role : "IT",
    departement : new Departement(7,"informatique")
    }
]

