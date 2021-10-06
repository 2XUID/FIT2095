import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { DatabaseService } from "./database.service";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ListactorsComponent } from "./actor/listactors/listactors.component";
import { AddactorComponent } from "./actor/addactor/addactor.component";
import { DeleteactorComponent } from "./actor/deleteactor/deleteactor.component";
import { UpdateactorComponent } from "./actor/updateactor/updateactor.component";
import { W10strsubPipe } from './w10strsub.pipe';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { CreatemovieComponent } from './movie/createmovie/createmovie.component';
import { ListmoviesComponent } from './movie/listmovies/listmovies.component';
import { DeletemovieComponent } from './movie/deletemovie/deletemovie.component';
import { AddactortomovieComponent } from './movie/addactortomovie/addactortomovie.component';
import { InvalidComponent } from './invalid/invalid.component';
const appRoutes: Routes = [
  { path: "listactors", component: ListactorsComponent },
  { path: "addactor", component: AddactorComponent },
  { path: "updateactor", component: UpdateactorComponent },
  { path: "deleteactor", component: DeleteactorComponent },
  { path: "createmovie", component: CreatemovieComponent },
  { path: "listmovies", component: ListmoviesComponent },
  { path: "deletemovie", component: DeletemovieComponent },
  { path: "addactortomovie", component: AddactortomovieComponent },
  { path: "invalid", component: InvalidComponent },
  { path: "", redirectTo: "/listactors", pathMatch: "full" },
  { path: "**", redirectTo:"/invalid"},
];
@NgModule({
  declarations: [
    AppComponent,
    ListactorsComponent,
    AddactorComponent,
    UpdateactorComponent,
    DeleteactorComponent,
    W10strsubPipe,
    CreatemovieComponent,
    ListmoviesComponent,
    DeletemovieComponent,
    AddactortomovieComponent,
    InvalidComponent,
  ],
  imports: [RouterModule.forRoot(appRoutes),BrowserModule,FormsModule, HttpClientModule, ReactiveFormsModule, ServiceWorkerModule.register('ngsw-worker.js', {
  enabled: environment.production,
  // Register the ServiceWorker as soon as the app is stable
  // or after 30 seconds (whichever comes first).
  registrationStrategy: 'registerWhenStable:30000'
}) ],
  providers: [DatabaseService],
  bootstrap: [AppComponent],
})
export class AppModule {}