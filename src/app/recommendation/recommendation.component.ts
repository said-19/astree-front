import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClient, HttpClientModule } from "@angular/common/http";

@Component({
  selector: "app-recommendation",
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: "./recommendation.component.html",
  styleUrls: ["./recommendation.component.css"],
})
export class RecommendationComponent {
  userId: number | null = null;
  recommendations: any[] = [];
  loading = false;
  errorMessage = "";
  apiUserId: string | null = null;

  private apiUrl = "https://localhost:7005/api/recommendations";

  contracts = [
    { contract_id: 1, name: "Couverture Basique" },
    { contract_id: 2, name: "Protection Premium" },
    { contract_id: 3, name: "Pack Famille" },
    { contract_id: 4, name: "Professionnel Plus" },
    { contract_id: 5, name: "Sécurité Sénior" },
    { contract_id: 6, name: "Jeune Conducteur" },
  ];

  constructor(private http: HttpClient) {}

  getRecommendations() {
    if (!this.userId) {
      this.errorMessage = "Veuillez entrer un identifiant utilisateur valide.";
      this.recommendations = [];
      return;
    }

    this.loading = true;
    this.errorMessage = "";
    this.recommendations = [];

    this.http.get<any>(`${this.apiUrl}/${this.userId}`).subscribe({
      next: (data) => {
        this.apiUserId = data.user_id;
        this.recommendations = (data.recommendations || []).map((r) => ({
          ...r,
          score: Number(r.score), // Convertir en nombre pour éviter undefined
        }));
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage =
          "Erreur lors de la récupération des recommandations.";
        console.error(err);
      },
    });
  }
  getContractName(itemId: number): string {
  const contract = this.contracts.find(c => c.contract_id === itemId);
  return contract ? contract.name : '—';
}

}
