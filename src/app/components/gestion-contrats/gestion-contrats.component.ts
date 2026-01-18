import { Component, OnInit } from '@angular/core';
import { ContratService } from '../../services/contrat.service';
import { Contrat } from '../../models/contrat';

@Component({
  selector: 'app-gestion-contrats',
  templateUrl: './gestion-contrats.component.html'
})
export class GestionContratsComponent implements OnInit {
  contrats: Contrat[] = [];
  newContrat: Contrat = {
    nom: '',
    description: '',
    prixMoyenTND: 0,
    franchiseTND: 0,
    caracteristiques: '',
    entrepriseId: 0,
    userId: 0
  };

  constructor(private contratService: ContratService) {}

  ngOnInit(): void {
    this.loadContrats();
  }

  loadContrats() {
    this.contratService.getContrats().subscribe(res => {
      this.contrats = res.data; // car ton backend renvoie {success, message, data}
    });
  }

  addContrat() {
    this.contratService.createContrat(this.newContrat).subscribe(() => {
      this.loadContrats();
      this.newContrat = {
        nom: '',
        description: '',
        prixMoyenTND: 0,
        franchiseTND: 0,
        caracteristiques: '',
        entrepriseId: 0,
        userId: 0
      };
    });
  }

  updateContrat(c: Contrat) {
    if (c.id) {
      this.contratService.updateContrat(c.id, c).subscribe(() => this.loadContrats());
    }
  }

  deleteContrat(id: number | undefined) {
    if (id) {
      this.contratService.deleteContrat(id).subscribe(() => this.loadContrats());
    }
  }
}
