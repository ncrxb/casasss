import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CasasComponent } from './components/casas/casas.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full'},

  { path: 'casas', component: CasasComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
