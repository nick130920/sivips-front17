export interface Pages {
    title: string;
    subPages?: SubPages[];
    link?: string;
    icon: string;
}

export interface SubPages {
    title: string;
    link: string;
}
