// Pour lecture (GET)
export interface Entreprise {
  id: number;
  nom: string;
}

// Pour création (POST)
export interface EntrepriseCreateDto {
  nom: string;
}

// Pour mise à jour (PUT)
export interface EntrepriseUpdateDto {
  id: number;
  nom: string;
}
