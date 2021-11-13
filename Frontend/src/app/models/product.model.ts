import { CategoryModel } from "./category.model";

export class ProductModel {
    _id: string;
    name: string;
    categoryId: string; 
    price: number;
    imageName: string; 
    image: FileList;
    category: CategoryModel;
}
