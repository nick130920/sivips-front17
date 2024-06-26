import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HlmButtonModule } from '@lib/ui/ui-button-helm/src';
import { CapItem } from '@lib/interfaces';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-table',
    standalone: true,
    imports: [CommonModule, HlmButtonModule, FormsModule],
    templateUrl: './table.component.html',
})
export class TableComponent {
    @Input() items: CapItem[] = [];
    @Output() edit = new EventEmitter<CapItem>();
    @Output() delete = new EventEmitter<CapItem>();
    @Output() update = new EventEmitter<CapItem>();

    editingIndexes: Set<number> = new Set<number>();

    startEdit(index: number): void {
        this.editingIndexes.add(index);
    }

    saveEdit(item: CapItem, index: number): void {
        this.editingIndexes.delete(index);
        this.update.emit(item);
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
