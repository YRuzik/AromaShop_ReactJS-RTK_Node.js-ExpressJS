import { FilterTypes } from "../layouts/clientLayout/pages/catalog/filterGoods";

export function filterToString (type: FilterTypes) {
    switch (type) {
        case FilterTypes.all:
            return "Все товары";
        case FilterTypes.aroma:
            return "Ароматические";
        case FilterTypes.collabs:
            return "Коллаборации";
        case FilterTypes.long:
            return "Большие";
        case FilterTypes.small:
            return "Маленькие";
        case FilterTypes.special:
            return "Специальные";
        case FilterTypes.usual:
            return "Обычные";
        default: return "null";
    }
}