import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
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
    items: CapItem[] = [];
    visibleItems: CapItem[] = [];
    loading = false;
    constructor(
        // eslint-disable-next-line @typescript-eslint/naming-convention
        private fb: FormBuilder,
    ) {}
    capForm = this.fb.group({
        // eslint-disable-next-line @typescript-eslint/unbound-method
        requirementName: ['', Validators.required],
        // eslint-disable-next-line @typescript-eslint/unbound-method
        description: ['', Validators.required],
        mandatory: [false],
    });
    ngOnInit(): void {
        this.items = [
            { requirementName: 'Nombre 1', description: 'Descripción 1', mandatory: true },
            { requirementName: 'Nombre 2', description: 'Descripción 2', mandatory: false },
        ];

        this._updateVisibleItems();
    }

    onSubmit(): void {
        this.capForm.markAllAsTouched();
        if (this.capForm.invalid) {
            return;
        }
        this.loading = true;
        setTimeout(() => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const newItem: CapItem = JSON.parse(JSON.stringify(this.capForm.value));
            this.items.push(newItem);
            this._updateVisibleItems();
            console.log(newItem);
            this.capForm.reset();
            this.loading = false;
        }, 800);
    }

    onEdit(item: CapItem): void {
        const index = this.items.indexOf(item);
        if (index !== -1) {
            this.capForm.patchValue({
                requirementName: item.requirementName,
                description: item.description,
                mandatory: item.mandatory,
            });

            this.items.splice(index, 1);
            this._updateVisibleItems();
        }
    }

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
        this.loading = true;
        setTimeout(() => {
            this.loading = false;
        }, 800);
    }
}
