import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '@lib/components';
import { TableComponent } from '@lib/components/table/table.component';
import { CapItem } from '@lib/interfaces';
import { HlmButtonModule } from '@lib/ui/ui-button-helm/src';

@Component({
    selector: 'app-cap',
    standalone: true,
    imports: [NgIf, SidebarComponent, RouterModule, ReactiveFormsModule, TableComponent, HlmButtonModule],
    templateUrl: './cap.component.html',
})
export class CapComponent {
    capForm = new FormGroup({
        // eslint-disable-next-line @typescript-eslint/unbound-method
        requirementName: new FormControl('', Validators.required),
        // eslint-disable-next-line @typescript-eslint/unbound-method
        description: new FormControl('', Validators.required),
        // eslint-disable-next-line @typescript-eslint/unbound-method
        mandatory: new FormControl(false, Validators.required),
    });

    items: CapItem[] = [];

    onSubmit = (): void => {
        const formValue = this.capForm.value;
        const newItem: CapItem = {
            requirementName: formValue.requirementName || '',
            description: formValue.description || '',
            mandatory: formValue.mandatory || false,
        };

        this.items.push(newItem);
        this.items = [...this.items];
        console.log(newItem);
        this.capForm.reset();
    };

    onEdit = (item: CapItem): void => {
        const index = this.items.indexOf(item);
        if (index !== -1) {
            this.capForm.setValue({
                requirementName: item.requirementName,
                description: item.description,
                mandatory: item.mandatory,
            });
            this.items.splice(index, 1);
        }
    };
}
