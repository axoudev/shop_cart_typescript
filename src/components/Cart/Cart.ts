import Item from '../Item/Item';
import getTemplate from './template';
import { coupons } from '../../js/data';

export default class Cart{
    private _items: Item[];
    private _discount: number;
    private _elem: HTMLElement;
    private _itemsPrice: number;
    private _finalPrice: number;
    private _deliveryPrice: number;

    constructor(elem: string, items: {id: number, name: string, category: string, price: number, quantity: number}[]){
        this._items = [];
        this._elem = document.querySelector(elem)!;
        this._discount = 0;
        this._itemsPrice = 0;
        this._finalPrice = 0;
        this._deliveryPrice = 0;

        this._loadItems(items);
        this._setPrices();
        this.renderAll();
        this._activateElements();
    }

    private _loadItems(items :{id: number, name: string, category: string, price: number, quantity: number}[]): void 
    {
        items.forEach(item => {
          this._items.push(new Item(item, this));
        });
    }

    private _setPrices(): void
    {
        this._setItemsPrice();
        this._setFinalPrice();
    }

    private _setItemsPrice(): void
    {
        this._itemsPrice = 0;
        this._items.forEach(item => {
            this._itemsPrice += item.price * item.quantity;
        });
    }

    private _setFinalPrice(): void
    {
        this._finalPrice = (this._itemsPrice + this._deliveryPrice) - (this._itemsPrice + this._deliveryPrice) * this._discount;
    }

    public renderAll(): void
    {
        this._renderSelf();
        this._renderItems();
    }

    private _activateElements(): void
    {
        this._activateCouponInput();
    }

    private _activateCouponInput(){
        const couponInput :HTMLInputElement = this._elem.querySelector(".code-input")!;
        couponInput.onkeyup = (e) => {
            if(e.code === "Enter"){
                coupons.forEach(coupon => {
                    if(coupon.name == couponInput.value){
                        this._discount = coupon.discount;
                        this._setPrices();
                        this.renderAll();

                        document.querySelector('.active-coupons')!.innerHTML = coupon.name;
                    }
                });
            }
        }
    }

    private _renderSelf(): void
    {
        this._elem.innerHTML = getTemplate(this);
    }

    private _renderItems() :void{  
        this._items.forEach(item => item.render('.items-list'));
    }

    // ------------------------------
    // GETTERS
    // ------------------------------

    public get items(): Item[]{
        return this._items
    }

    public get itemsPrice(): number{
        return this._itemsPrice;
    }

    public get finalPrice(): number{
        return this._finalPrice;
    }

    public get discount(): number{
        return this._discount;
    }
}