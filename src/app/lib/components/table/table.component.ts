import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HlmButtonModule } from '@lib/ui/ui-button-helm/src';
import { CapItem } from '@lib/interfaces';

@Component({
    selector: 'app-table',
    standalone: true,
    imports: [CommonModule, HlmButtonModule],
    templateUrl: './table.component.html',
})
export class TableComponent {
    @Input() items: CapItem[] = [];
    @Output() edit = new EventEmitter<CapItem>();

    editItem = (item: CapItem): void => {
        this.edit.emit(item);
    };
}
