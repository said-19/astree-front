import { Component } from '@angular/core';
import { QrCodeService } from 'app/services/qr-code.service';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss']
})
export class QrCodeComponent {
  qrCodeImage: string | null = null;
  loading = false;

  constructor(private qrService: QrCodeService) {}

  generate() {
    this.loading = true;

    const data = [
      {
        Nom: "Protection Premium",
        Description: "Couverture complète pour tous les besoins",
        PrixMoyenTND: 2500,
        FranchiseTND: 500,
        Caracteristiques: "Personnes à revenu élevé avec voitures récentes"
      },
      {
        Nom: "Pack Famille",
        Description: "Pack spécial pour familles avec multiples véhicules",
        PrixMoyenTND: 1800,
        FranchiseTND: 400,
        Caracteristiques: "Familles avec 2+ véhicules"
      },
      {
        Nom: "Professionnel plus",
        Description: "Adapté aux professionnels avec kilométrage élevé",
        PrixMoyenTND: 2200,
        FranchiseTND: 600,
        Caracteristiques: "Indépendants ou professionnels"
      },
      {
        Nom: "Sécurité Sénior",
        Description: "Remises pour conducteurs expérimentés",
        PrixMoyenTND: 1500,
        FranchiseTND: 350,
        Caracteristiques: "Conducteurs de plus de 45 ans sans antécédents"
      },
      {
        Nom: "Jeune conducteur",
        Description: "Tarifs adorables pour jeunes conducteurs",
        PrixMoyenTND: 1000,
        FranchiseTND: 450,
        Caracteristiques: "Conducteurs de moins de 30 ans avec budget limité"
      },
      {
        Nom: "Assurance Auto premium",
        Description: "Couvre les accidents et vols, assistance 24/7",
        PrixMoyenTND: 1500,
        FranchiseTND: 300,
        Caracteristiques: "Couverture complète"
      }
    ];

    this.qrService.generateQRCode(data).subscribe({
      next: res => {
        this.qrCodeImage = res.qrCode;
        this.loading = false;
      },
      error: err => {
        console.error('Erreur QR:', err);
        this.loading = false;
      }
    });
  }
}
