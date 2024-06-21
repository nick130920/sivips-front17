import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
export class CapComponent implements OnInit {
    ngOnInit(): void {
        this.items = [
            { requirementName: 'Nombre 1', description: 'Descripción 1', mandatory: true },
            { requirementName: 'Nombre 2', description: 'Descripción 2', mandatory: false },
        ];
        this._updateVisibleItems();
    }
    capForm = new FormGroup({
        // eslint-disable-next-line @typescript-eslint/unbound-method
        requirementName: new FormControl('', Validators.required),
        // eslint-disable-next-line @typescript-eslint/unbound-method
        description: new FormControl('', Validators.required),
        // eslint-disable-next-line @typescript-eslint/unbound-method
        mandatory: new FormControl(false),
    });

    items: CapItem[] = [];
    visibleItems: CapItem[] = [...this.items];
    onSubmit = (): void => {
        if (this.capForm.valid) {
            const formValue = this.capForm.value;
            const newItem: CapItem = {
                requirementName: formValue.requirementName || '',
                description: formValue.description || '',
                mandatory: formValue.mandatory || false,
            };

            this.items.push(newItem);
            this._updateVisibleItems();
            console.log(newItem);
            this.capForm.reset({ mandatory: false });
        } else {
            console.log('El formulario no es válido');
        }
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
            this._updateVisibleItems();
        }
    };

    onDelete(item: CapItem): void {
        const index = this.items.indexOf(item);
        if (index !== -1) {
            this.items.splice(index, 1);
            this._updateVisibleItems();
        }
    }

    private _updateVisibleItems(): void {
        this.visibleItems = [...this.items];
    }

    updateItem(updatedItem: CapItem): void {
        const index = this.items.findIndex((item) => item.requirementName === updatedItem.requirementName);
        if (index !== -1) {
            this.items[index] = updatedItem;
            this._updateVisibleItems();
        }
    }
}
