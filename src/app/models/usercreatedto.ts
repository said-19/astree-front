export interface UserCreateDto {
  nom: string;
  prenom: string;
  email: string;
  motDePasse: string;
  numeroTelephone: string;
  role: string; //"Admin" | "Client" | "Agent";
  entrepriseId: number;

  // Optionnels
  isEmailConfirmed?: boolean; // false par défaut
  activationToken?: string;   // générer un token côté front ou laisser null
  isActive?: boolean;         // false par défaut
  profileImagePath?: string;

  resetPasswordToken?: string | null;
  resetPasswordTokenExpiration?: string | null;
  tempNewPassword?: string | null;
}
