export interface Wizard {
    title: string;
    description: string;
}

export interface WizardStep extends Wizard {
    id: number;
    isCompleted: boolean;
    isCurrent: boolean;
}
