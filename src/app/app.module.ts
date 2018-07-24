import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AgmCoreModule,AgmMap,AgmMarker } from '@agm/core'


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
           apiKey:'API NUMBER',
           libraries: ["places"],
           language: 'pt-BR',
           region: 'BR'
          })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
