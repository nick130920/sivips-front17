import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '@lib/components';
import { DoctableComponent } from '@lib/components/doctable/doctable.component';
import { DocItem } from '@lib/interfaces/doc.interface';
import { HlmButtonModule } from '@lib/ui/ui-button-helm/src';

@Component({
    selector: 'app-doc',
    standalone: true,
    imports: [NgIf, SidebarComponent, RouterModule, ReactiveFormsModule, DoctableComponent, HlmButtonModule],
    templateUrl: './doc.component.html',
})
export class DocComponent implements OnInit {
    items: DocItem[] = [];
    visibleItems: DocItem[] = [];
    loading = false;
    constructor(
        // eslint-disable-next-line @typescript-eslint/naming-convention
        private fb: FormBuilder,
    ) {}
    docForm = this.fb.group({
        // eslint-disable-next-line @typescript-eslint/unbound-method
        requirementName: ['', Validators.required],
        // eslint-disable-next-line @typescript-eslint/unbound-method
        productionty: ['', Validators.required],
        mandatory: [false],
    });
    ngOnInit(): void {
        this.items = [
            { requirementName: 'Nombre 1', productionty: 'Producción tipo 1', mandatory: true },
            { requirementName: 'Nombre 2', productionty: 'Descrición tipo 2', mandatory: false },
        ];

        this._updateVisibleItems();
    }
    onSubmit(): void {
        this.docForm.markAllAsTouched();
        if (this.docForm.invalid) {
            return;
        }
        this.loading = true;
        setTimeout(() => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const newItem: DocItem = JSON.parse(JSON.stringify(this.docForm.value));
            this.items.push(newItem);
            this._updateVisibleItems();
            console.log(newItem);
            this.docForm.reset();
            this.loading = false;
        }, 500);
    }
    onEdit(item: DocItem): void {
        const index = this.items.indexOf(item);
        if (index !== -1) {
            this.docForm.patchValue({
                requirementName: item.requirementName,
                productionty: item.productionty,
                mandatory: item.mandatory,
            });
        }
    }
    onDelete(item: DocItem): void {
        const index = this.items.indexOf(item);
        if (index !== -1) {
            this.items.splice(index, 1);
            this._updateVisibleItems();
        }
    }
    upDateItem(updatedItem: DocItem): void {
        const index = this.items.findIndex((item) => item.requirementName === updatedItem.requirementName);
        if (index !== -1) {
            this.items[index] = updatedItem;
            this._updateVisibleItems();
        }
        this.loading = true;
        setTimeout(() => {
            this.loading = false;
        }, 500);
    }
    private _updateVisibleItems(): void {
        this.visibleItems = [...this.items];
    }
}
