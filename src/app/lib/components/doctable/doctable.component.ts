import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HlmButtonModule } from '@lib/ui/ui-button-helm/src';
import { FormsModule } from '@angular/forms';
import { DocItem } from '@lib/interfaces/doc.interface';

@Component({
    selector: 'app-doctable',
    standalone: true,
    imports: [CommonModule, HlmButtonModule, FormsModule],
    templateUrl: './doctable.component.html',
})
export class DoctableComponent {
    @Input() items: DocItem[] = [];
    @Output() edit = new EventEmitter<DocItem>();
    @Output() delete = new EventEmitter<DocItem>();
    @Output() update = new EventEmitter<DocItem>();

    editingIndexes: Set<number> = new Set<number>();

    startEdit(index: number): void {
        this.editingIndexes.add(index);
    }

    saveEdit(item: DocItem, index: number): void {
        this.editingIndexes.delete(index);
        this.update.emit(item);
    }

    cancelEdit(index: number): void {
        this.editingIndexes.delete(index);
    }

    editItem(item: DocItem): void {
        this.edit.emit(item);
    }

    deleteItem(item: DocItem): void {
        this.delete.emit(item);
    }
}
