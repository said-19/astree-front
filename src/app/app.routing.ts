import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { GestionUtilisateursComponent } from "./components/gestion-utilisateurs/gestion-utilisateurs.component";
import { GestionContratsComponent } from "./components/gestion-contrats/gestion-contrats.component";
import { GestionEntreprisesComponent } from "./components/gestion-entreprise/gestion-entreprise.component";
import { LoginComponent } from "./components/login/login.component";
import { AuthGuard } from "./guards/auth.guard";
import { QrCodeComponent } from "./components/qr-code/qr-code.component";
import { RecommendationComponent } from "./recommendation/recommendation.component";


const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "qr-code", component: QrCodeComponent },


  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full",
  },
  

  
  
  {
    path: "",
    component: AdminLayoutComponent,
    canActivate: [AuthGuard], // ⬅️ protège l’accès
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./layouts/admin-layout/admin-layout.module").then(
            (m) => m.AdminLayoutModule
          ),
      },
    ],
  },
  {
    path: "usermanagement",
    component: GestionUtilisateursComponent,
  },
  {
    path: "contratmanagement",
    component: GestionContratsComponent,
  },

  {
    path: "entreprisemanagement",
    component: GestionEntreprisesComponent,
  },

  {
    path: "recommendation",
    component: RecommendationComponent,
  }

];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [],
})
export class AppRoutingModule {}
