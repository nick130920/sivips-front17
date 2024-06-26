import { NgIf, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '@lib/components';
import { DoctableComponent } from '@lib/components/doctable/doctable.component';
import { DocItem } from '@lib/interfaces/doc.interface';
import { HlmButtonModule } from '@lib/ui/ui-button-helm/src';

@Component({
    selector: 'app-doc',
    standalone: true,
    imports: [NgIf, NgFor, SidebarComponent, RouterModule, ReactiveFormsModule, DoctableComponent, HlmButtonModule],
    templateUrl: './doc.component.html',
})
export class DocComponent implements OnInit {
    items: DocItem[] = [];
    visibleItems: DocItem[] = [];
    loading = false;
    dropdownOpen = false;
    productionTypes = ['Opción 1', 'Opción 2', 'Opción 3'];

    // eslint-disable-next-line @typescript-eslint/naming-convention
    constructor(private fb: FormBuilder) {}

    docForm = this.fb.group({
        // eslint-disable-next-line @typescript-eslint/unbound-method
        requirementName: ['', Validators.required],
        // eslint-disable-next-line @typescript-eslint/unbound-method
        productionty: this.fb.array([], Validators.required),
        mandatory: [false],
    });

    ngOnInit(): void {
        this.items = [
            { requirementName: 'Nombre 1', productionty: ['Producción tipo 1'], mandatory: true },
            { requirementName: 'Nombre 2', productionty: ['Descrición tipo 2'], mandatory: false },
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
            const newItem: DocItem = {
                requirementName: this.docForm.value.requirementName as string,
                productionty: this.docForm.value.productionty as string[],
                mandatory: this.docForm.value.mandatory as boolean,
            };
            this.items.push(newItem);
            this._updateVisibleItems();
            this.docForm.reset();
            this.loading = false;
        }, 500);
    }

    onCheckboxChange(event: Event): void {
        const target = event.target as HTMLInputElement;
        const productionty = this.docForm.get('productionty') as FormArray;

        if (target.checked) {
            productionty.push(new FormControl(target.value));
        } else {
            const index = productionty.controls.findIndex((x) => x.value === target.value);
            productionty.removeAt(index);
        }
    }

    toggleDropdown(): void {
        this.dropdownOpen = !this.dropdownOpen;
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
        console.log(this.visibleItems);
    }
}
