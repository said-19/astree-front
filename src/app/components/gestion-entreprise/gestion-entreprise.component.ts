import { Component, OnInit } from '@angular/core';
import { EntrepriseService } from '../../services/entreprise.service';
import { Entreprise, EntrepriseCreateDto, EntrepriseUpdateDto } from '../../models/entreprise';

@Component({
  selector: 'app-gestion-entreprise',
  templateUrl: './gestion-entreprise.component.html'
})
export class GestionEntreprisesComponent implements OnInit {
  entreprises: Entreprise[] = [];
  newEntreprise: EntrepriseCreateDto = { nom: '' };

  constructor(private entrepriseService: EntrepriseService) {}

  ngOnInit(): void {
    this.loadEntreprises();
  }

  loadEntreprises() {
    this.entrepriseService.getEntreprises().subscribe(res => {
      this.entreprises = res;
    });
  }

  addEntreprise() {
    this.entrepriseService.createEntreprise(this.newEntreprise).subscribe(() => {
      this.loadEntreprises();
      this.newEntreprise = { nom: '' };
    });
  }

  updateEntreprise(e: Entreprise) {
    const updateDto: EntrepriseUpdateDto = { id: e.id, nom: e.nom };
    this.entrepriseService.updateEntreprise(updateDto).subscribe(() => this.loadEntreprises());
  }

  deleteEntreprise(id: number) {
    this.entrepriseService.deleteEntreprise(id).subscribe(() => this.loadEntreprises());
  }
}
