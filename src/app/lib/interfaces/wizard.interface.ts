export interface Wizard {
    title: string;
    description: string;
    clickable: boolean;
}

export interface WizardStep extends Wizard {
    id: number;
    isCompleted: boolean;
    isCurrent: boolean;
}
