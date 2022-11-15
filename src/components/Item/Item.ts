import Cart from "../Cart/Cart";
import getTemplate from "./template";

export default class Item{
    private _id: number;
    private _name: string;
    private _price: number;
    private _category: string;
    private _quantity: number;
    private _parent: Cart;

    public constructor(data: {id: number, name: string, category: string, price: number, quantity: number}, parent: Cart)
    {
        this._id = data.id;
        this._name = data.name;
        this._price = data.price;
        this._category = data.category;
        this._quantity = data.quantity;
        this._parent = parent;
    }

    public render(parentClass : string){
        const newItem :HTMLElement = document.createElement('div');
        document.querySelector(parentClass)?.append(newItem);
        newItem.outerHTML = getTemplate(this);
      }

    // ------------------------------
    // GETTERS
    // ------------------------------

    public get id(): number{
        return this._id;
    }

    public get name(): string{ 
        return this._name; 
    }

    public get price(): number{
        return this._price;
    }

    public get category(): string{
        return this._category;
    }

    public get quantity(): number{
        return this._quantity;
    }
}