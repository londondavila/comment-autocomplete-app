import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommentsComponent } from "./comments.component";
import { SearchFilterPipe } from "./search.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [
        CommentsComponent,
        SearchFilterPipe
    ],
    exports: [
        CommentsComponent,
        SearchFilterPipe
    ]
})
export class CommentsModule {}