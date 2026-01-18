export interface Contrat {
  id?: number; // optionnel à la création
  nom: string;
  description: string;
  prixMoyenTND: number;
  franchiseTND: number;
  caracteristiques?: string;
  entrepriseId: number;
  userId: number;
}
