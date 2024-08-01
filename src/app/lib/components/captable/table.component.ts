import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HlmButtonModule } from '@lib/ui/ui-button-helm/src';
import { CapItem } from '@lib/interfaces';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CapService } from '@lib/services/cap/cap.service';

@Component({
    selector: 'app-table',
    standalone: true,
    imports: [CommonModule, HlmButtonModule, FormsModule, ReactiveFormsModule],
    templateUrl: './table.component.html',
})
export class TableComponent {
    constructor(public capService: CapService) {}
    @Input() items: CapItem[] = [];
    @Input() formGroup!: FormGroup;
    @Output() edit = new EventEmitter<CapItem>();
    @Output() delete = new EventEmitter<CapItem>();
    @Output() update = new EventEmitter<CapItem>();
    loading = false;
    editingIndexes: Set<number> = new Set<number>();
    startEdit(index: number): void {
        this.editingIndexes.add(index);
    }

    saveEdit(item: CapItem, index: number): void {
        this.loading = true;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        this.capService.updateItem(item).subscribe({
            next: (response) => {
                this.capService.items.update((old) => [...old.slice(0, index), item, ...old.slice(index + 1)]);
                console.log(response);
                this.editingIndexes.delete(index);
                this.loading = false;
            },
            error: (error) => {
                console.error('There was an error!', error);
                this.loading = false;
            },
        });
    }

    cancelEdit(index: number): void {
        this.editingIndexes.delete(index);
    }

    editItem(item: CapItem): void {
        this.edit.emit(item);
    }

    deleteItem(item: CapItem): void {
        this.delete.emit(item);
    }
}
