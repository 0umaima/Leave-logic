export interface Departement{
  nom_dept: string,
  id_dept : number


}

export class Departement{
  nom_dept: string
  id_dept : number
  constructor(id: number, nom: string) {
    this.id_dept = id;
    this.nom_dept= nom;
}
}
/*
export const departements: Departement[] = [
	{
    id :1 ,
    dept_nom: "IT"
	},
	{
    id : 6,
    dept_nom:" finance"
	},
	{
    id : 2,
    dept_nom: " hr"
	},
	{
    id : 7 ,
    dept_nom: "Sales"
	},
	{
    id : 4,
    dept_nom: "administration"
	},
	{
    id :3 ,
    dept_nom: " marketing"
	},
	{
    id :10 ,
    dept_nom: "Design"
	},
	{
    id :9 ,
    dept_nom:" research and development"
	}

];
*/
