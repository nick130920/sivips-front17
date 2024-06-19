import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '@lib/components';
import { TableComponent } from '@lib/components/table/table.component';

@Component({
    selector: 'app-cap',
    standalone: true,
    imports: [NgIf, SidebarComponent, RouterModule, ReactiveFormsModule, TableComponent],
    templateUrl: './cap.component.html',
})
export class CapComponent {
    capForm = new FormGroup({
        requirementName: new FormControl(''),
        description: new FormControl(''),
        mandatory: new FormControl(''),
    });

    onSubmit(): void {
        console.log();
    }
}
