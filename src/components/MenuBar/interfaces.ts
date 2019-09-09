type MenuItemType = "normal" | "separator";

export interface MenuItemDef {
    callback?: () => void;
    checked?: boolean;
    enabled?: boolean;
    keyBinding?: string;
    label?: string;
    mixed?: boolean;
    role?: string;
    submenu?: MenuItemDef[];
    type?: MenuItemType;
    visible?: boolean;
}