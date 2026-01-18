export interface UserUpdateDto {
  id: number;   // obligatoire pour l’update
  nom: string;
  prenom: string;
  email: string;
  numeroTelephone: string;
  role: "Admin" | "Client" | "Agent";
  entrepriseId: number;

  isActive?: boolean;
  profileImagePath?: string | null;
}
