import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { CalculadoraComponent } from './calculadora/calculadora.component'; // importando o componente CalculadoraComponent

@NgModule({
  declarations: [
    AppComponent,
    CalculadoraComponent // incluindo o componente CalculadoraComponent no módulo
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
