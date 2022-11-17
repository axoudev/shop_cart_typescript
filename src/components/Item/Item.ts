import Cart from "../Cart/Cart";
import getTemplate from "./template";

export default class Item{
    private _id: number;
    private _name: string;
    private _price: number;
    private _category: string;
    private _quantity: number;
    private _parent: Cart;
    private _elem: any;
    private _image: string;

    public constructor(data: {id: number, name: string, category: string, price: number, quantity: number, image: string}, parent: Cart)
    {
        this._id = data.id;
        this._name = data.name;
        this._price = data.price;
        this._category = data.category;
        this._quantity = data.quantity;
        this._image = data.image;
        this._parent = parent;
        this._elem = null;
    }

    public render(parentClass : string){
        const newItem :HTMLElement = document.createElement('div');
        document.querySelector(parentClass)?.append(newItem);
        newItem.outerHTML = getTemplate(this);

        this._elem = this._parent.elem.querySelector(parentClass + " .item:last-of-type")
        const options :HTMLOptionElement[] = this._elem.querySelectorAll(".select option");
        options.forEach(option => {
            if(Number(option.value) == this._quantity){
                option.setAttribute('selected', 'true');
            }
        })

        this._activateElements();
    }

    private _activateElements(){
        this._activateQuantitySelect();
        this._activateSelfDestroy();
    }

    private _activateQuantitySelect(){
        const quantitySelect :HTMLSelectElement = this._elem.querySelector(".select")!;
        quantitySelect.onchange = () => {
            let value = quantitySelect.options[quantitySelect.selectedIndex].value;
            this._quantity = Number(value);
            this._parent.setPrices()
            this._parent.renderPrices();
            this._parent.refreshLocalStorage();
        }
    }

    private _activateSelfDestroy(){
        this._elem.querySelector('.destroy').onclick = () => {
            this._destroySelf();
        }
    }

    private _destroySelf(){
        this._elem.remove();
        this._parent.destroyItem(this._id);
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

    public get image(): string{
        return this._image;
    }
}