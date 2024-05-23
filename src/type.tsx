export interface FormDatas {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    status: string;
}

export interface Errors {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}
export interface LoginFormData{
    email?: string;
    password?: string;
    status?:string | null;
}

export interface UserData {
    username: string;
    email: string;
    password: string;
    status: string;
}

export interface ProductData {
    productId: string;
    productName: string;
    productImage: string;
}

export interface ProductProps {
    product: {
        productId: string;
        productName: string;
        productImage: string;
    };
}

export interface CustomPopupProps {
    handleClose: () => void;
    handleLogin: () => void;
}
export interface Meal {
    id:string;
    name:string;
    image:string;
}
export interface MealDescription{
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strInstructions: string;
}
export interface SearchProps {
    handleSearch:(event: React.ChangeEvent<HTMLInputElement>) => void;
}