import { Component, OnInit } from "@angular/core";
import { User } from "../../models/user";
import { UserService } from "../../services/user.service";
import { UserCreateDto } from "app/models/usercreatedto";
import { UserUpdateDto } from "app/models/userupdatedto";

@Component({
  selector: "app-gestion-utilisateurs",
  templateUrl: "./gestion-utilisateurs.component.html",
})
export class GestionUtilisateursComponent implements OnInit {
  users: User[] = [];
  searchText: string = "";
  sortColumn: string = "id";
  sortDirection: "asc" | "desc" = "asc";

  newUser: UserCreateDto = {
    nom: "",
    prenom: "",
    email: "",
    motDePasse: "",
    numeroTelephone: "",
    role: "Client",
    entrepriseId: 1,
    isEmailConfirmed: false,
    activationToken: this.generateActivationToken(),
    isActive: false,
    profileImagePath: null,
    resetPasswordToken: null,
    resetPasswordTokenExpiration: null,
    tempNewPassword: null,
  };

  generateActivationToken(): string {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  selectedFile: File | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe((data) => (this.users = data));
  }

  /*addUser() {
    this.userService.addUser(this.newUser).subscribe(() => {
      this.loadUsers();
      this.newUser = {
        ...this.newUser,
        nom: "",
        prenom: "",
        email: "",
        motDePasse: "",
        numeroTelephone: "",
      };
    });
  }*/

  addUser() {
    // Réinitialiser le token à chaque création si besoin
    this.newUser.activationToken = this.generateActivationToken();

    this.userService.addUser(this.newUser).subscribe({
      next: (res) => {
        console.log("Utilisateur créé", res);
        this.users.push(res); // ajouter au tableau pour l'affichage
        // Réinitialiser le formulaire
        this.newUser = {
          ...this.newUser,
          nom: "",
          prenom: "",
          email: "",
          motDePasse: "",
          numeroTelephone: "",
        };
      },
      error: (err) => {
        console.error("Erreur création utilisateur", err);
        if (err.error && err.error.errors) {
          console.log("Erreurs de validation:", err.error.errors);
        }
      },
    });
  }
  get filteredUsers(): User[] {
    let filtered = this.users;

    // Filtrer par nom
    if (this.searchText) {
      const text = this.searchText.toLowerCase();
      filtered = filtered.filter((user) =>
        user.nom.toLowerCase().includes(text)
      );
    }

    // Tri par colonne
    filtered.sort((a: any, b: any) => {
      const valA = a[this.sortColumn];
      const valB = b[this.sortColumn];

      if (valA < valB) return this.sortDirection === "asc" ? -1 : 1;
      if (valA > valB) return this.sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    return filtered;
  }

  // Méthode pour changer le tri
  setSort(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
    } else {
      this.sortColumn = column;
      this.sortDirection = "asc";
    }
  }

  // users.component.ts
  editingUserId: number | null = null;

  editUser(user: any) {
    this.editingUserId = user.id;
  }

  cancelEdit() {
    this.editingUserId = null;
  }

  /*updateUser(user: User) {
    this.userService.updateUser(user).subscribe(() => this.loadUsers());
  }*/
  updateUser(user: UserUpdateDto) {
    const updatedUser: UserUpdateDto = {
      ...user,
      isActive: user.isActive ?? false,
      profileImagePath: user.profileImagePath ?? null,
    };

    this.userService.updateUser(updatedUser).subscribe({
      next: () => this.loadUsers(),
      error: (err) => {
        console.error("❌ Erreur mise à jour utilisateur", err);
        if (err.error && err.error.errors) {
          console.log("⚠️ Erreurs de validation backend:", err.error.errors);
        }
      },
    });
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(() => this.loadUsers());
  }

  onFileSelected(event: any, user: User) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => (user.profileImagePath = reader.result as string);
      reader.readAsDataURL(this.selectedFile);
    }
  }

  uploadFile(user: User) {
    if (!this.selectedFile) return;
    this.userService
      .uploadProfilePicture(user.id, this.selectedFile)
      .subscribe({
        next: (res: any) => {
          alert("Photo uploadée avec succès !");
          user.profileImagePath = res.path;
          this.selectedFile = null;
        },
        error: (err) => alert("Erreur lors de l'upload"),
      });
  }
}
