import { Faculty } from '@lib/interfaces';

const faculties: Faculty[] = [
    {
        id: 1,
        facultyName: 'Facultad de Ciencias exactas y naturales',
        logoLink: 'https://www.usco.edu.co/imagen-institucional/facultades/ciencias-exactas-y-naturales.png',
    },
    {
        id: 2,
        facultyName: 'Facultad de Ciencias Jurídicas y Políticas',
        logoLink: 'https://www.usco.edu.co/imagen-institucional/facultades/ciencias-juridicas-y-politicas.png',
    },
    {
        id: 3,
        facultyName: 'Facultad de ciencias sociales y humanas',
        logoLink: 'https://www.usco.edu.co/imagen-institucional/facultades/ciencias-sociales-y-humanas.png',
    },
    {
        id: 4,
        facultyName: 'Facultad de Economía y Administración',
        logoLink: 'https://www.usco.edu.co/imagen-institucional/facultades/economia-y-administracion.png',
    },
    {
        id: 5,
        facultyName: 'Facultad de Educación',
        logoLink: 'https://www.usco.edu.co/imagen-institucional/facultades/educacion.png',
    },
    {
        id: 6,
        facultyName: 'Facultad de Ingeniería',
        logoLink: 'https://www.usco.edu.co/imagen-institucional/facultades/ingenieria.png',
    },
    {
        id: 6,
        facultyName: 'Facultad de Salud',
        logoLink: 'https://www.usco.edu.co/imagen-institucional/facultades/salud.png',
    },
    {
        id: 8,
        facultyName: 'General',
        logoLink: 'https://www.usco.edu.co/imagen-institucional/logo/universidad-surcolombiana.png',
    },
];

export function getFaculty(id: number): Faculty {
    return faculties.find((faculty) => faculty.id === id) as Faculty;
}
