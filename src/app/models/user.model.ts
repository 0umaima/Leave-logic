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
	soldeConge: number;
    role: string[]; 
	departement: string;
    jwt?: string;

}

export const EMPLOYEES: Employees[] = [
    {
        nom: 'Smith',
        prenom: 'John',
        email: 'john.smith@example.com',
        password: 'john.smith',
        soldeConge: 25,
        role: ['HR'],
        departement: 'Engineering'
    },
    {
        nom: 'Johnson',
        prenom: 'Emily',
        email: 'emily.johnson@example.com',
        soldeConge: 22,
        password: 'emily.johnson',
        role: ['Manager'],
        departement: 'Marketing'
    },
    {
        nom: 'Garcia',
        prenom: 'Michael',
        email: 'michael.garcia@example.com',
        soldeConge: 20,
        role: ['HR'],
        departement: 'Finance'
    },
    {
        nom: 'Kim',
        prenom: 'Ji-hyun',
        email: 'ji-hyun.kim@example.com',
        soldeConge: 23,
        role: ['IT'],
        departement: 'Human Resources'
    },
    {
        nom: 'Wong',
        prenom: 'Li Wei',
        email: 'liwei.wong@example.com',
        soldeConge: 24,
        role: ['Finance'],
        departement: 'Project Management'
    },
    {
        nom: 'Dubois',
        prenom: 'Marie',
        email: 'marie.dubois@example.com',
        soldeConge: 21,
        role: ['HR'],
        departement: 'Finance'
    },
    {
        nom: 'Müller',
        prenom: 'Hans',
        email: 'hans.muller@example.com',
        soldeConge: 26,
        role: ['Finance'],
        departement: 'Sales'
    },
    {
        nom: 'Gupta',
        prenom: 'Arun',
        email: 'arun.gupta@example.com',
        soldeConge: 19,
        role: ['IT'],
        departement: 'Customer Support'
    },
    {
        nom: 'Chen',
        prenom: 'Wei',
        email: 'wei.chen@example.com',
        soldeConge: 22,
        role: ['HR'],
        departement: 'Operations'
    },
    {
        nom: 'Abdullah',
        prenom: 'Fatima',
        email: 'fatima.abdullah@example.com',
        soldeConge: 20,
        role: ['Finance'],
        departement: 'Quality Assurance'
    },
    {
        nom: 'Sato',
        prenom: 'Takashi',
        email: 'takashi.sato@example.com',
        soldeConge: 24,
        role: ['IT'],
        departement: 'Research and Development'
    },
    {
        nom: 'Lee',
        prenom: 'Seung-hoon',
        email: 'seung-hoon.lee@example.com',
        soldeConge: 23,
        role: ['HR'],
        departement: 'Design'
    },
    {
        nom: 'Ivanov',
        prenom: 'Dmitri',
        email: 'dmitri.ivanov@example.com',
        soldeConge: 25,
        role: ['IT'],
        departement: 'Information Technology'
    },
    {
        nom: 'Martinez',
        prenom: 'Carmen',
        email: 'carmen.martinez@example.com',
        soldeConge: 21,
        role: ['Finance'],
        departement: 'Administration'
    }
];
