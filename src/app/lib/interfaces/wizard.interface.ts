export interface WizardStep {
    title: string;
    description: string;
    completed: boolean;
    isCurrent?: boolean;
}
