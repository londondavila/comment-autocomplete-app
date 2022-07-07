import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteDirective } from './autocomplete.directive';
import { AutocompleteComponent } from './autocomplete.component';

@NgModule({
  declarations: [
    AutocompleteComponent,
    AutocompleteDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AutocompleteComponent,
    AutocompleteDirective
  ],
  bootstrap: [AutocompleteComponent]
})
export class AutocompleteModule { }
