import { NavbarComponent } from './navbar/navbar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { GestionUtilisateursComponent } from './gestion-utilisateurs/gestion-utilisateurs.component';
import { GestionEntreprisesComponent } from './gestion-entreprise/gestion-entreprise.component';
import { GestionContratsComponent } from './gestion-contrats/gestion-contrats.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginComponent } from './login/login.component';
import { QrCodeComponent } from './qr-code/qr-code.component';



@NgModule({
  declarations: [
    GestionUtilisateursComponent,
    GestionEntreprisesComponent,
    GestionContratsComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    LoginComponent,
    QrCodeComponent,

    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    GestionUtilisateursComponent,
    GestionEntreprisesComponent,
    GestionContratsComponent,
    FooterComponent,   // ✅ ajouté
    NavbarComponent,   // ✅ ajouté
    SidebarComponent,
    

  ]
})
export class ComponentsModule {}
