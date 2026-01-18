export interface User {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  motDePasse: string;
  numeroTelephone: string;
  role: string;  // "Admin" | "Client" | "Agent"
  createdAt: string;
  lastLoginDate?: string;
  isEmailConfirmed: boolean;
  activationToken?: string;
  isActive: boolean;
  resetPasswordToken?: string;
  resetPasswordTokenExpiration?: string;
  tempNewPassword?: string;
  profileImagePath?: string; // photo profil
  entrepriseId: number;
}
