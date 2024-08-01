import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '@lib/components';
import { TableComponent } from '@lib/components/captable/table.component';
import { CapItem } from '@lib/interfaces';
import { HlmButtonModule } from '@lib/ui/ui-button-helm/src';
import { CapService } from '@lib/services/cap/cap.service';

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
        private _fb: FormBuilder,
        public capService: CapService,
    ) {}
    capForm = this._fb.group({
        // eslint-disable-next-line @typescript-eslint/unbound-method
        nombre: ['', Validators.required],
        // eslint-disable-next-line @typescript-eslint/unbound-method,@typescript-eslint/naming-convention
        descripcion: ['', Validators.required],
        obligatorio: [false, { nonNullable: true }],
    });
    ngOnInit(): void {
        this.obtenerRequisitos();
    }

    onSubmit(): void {
        this.capForm.markAllAsTouched();
        if (this.capForm.invalid) {
            return;
        }
        this.loading = true;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const newItem: CapItem = JSON.parse(JSON.stringify(this.capForm.value));
        this.capService.addItem(newItem).subscribe({
            next: (response) => {
                this.capService.items.update((old) => [...old, newItem]);
                console.log(response);
                this.capForm.reset();
                this.loading = false;
            },
            error: (error) => {
                console.error('There was an error!', error);
                this.loading = false;
            },
        });
    }

    obtenerRequisitos(): void {
        this.loading = true;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment

        this.capService.getItems().subscribe({
            next: (response) => {
                this.capService.items.set(response);
                this.loading = false;
            },
            error: (error) => {
                console.error('There was an error!', error);
                this.loading = false;
            },
        });
    }

    /*onEdit(item: CapItem): void {

        if (index !== -1) {
            this.capForm.patchValue({
                requirementName: item.requirementName,
                description: item.description,
                mandatory: item.mandatory,
            });

            this.items.splice(index, 1);
            this._updateVisibleItems();
        }
    }*/

    onDelete(item: CapItem): void {
        const index = this.items.indexOf(item);
        if (index !== -1) {
            this.items.splice(index, 1);
        }
    }
    /*updateItem(updatedItem: CapItem): void {
        const index = this.items.findIndex((item) => item.requirementName === updatedItem.requirementName);
        if (index !== -1) {
            this.items[index] = updatedItem;
            this._updateVisibleItems();
        }
        this.loading = true;
        setTimeout(() => {
            this.loading = false;
        }, 800);
    }*/
}
