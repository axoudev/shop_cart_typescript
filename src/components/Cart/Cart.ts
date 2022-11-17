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

    constructor(elem: string, items: {id: number, name: string, category: string, price: number, quantity: number, image: string}[]){
        this._items = [];
        this._elem = document.querySelector(elem)!;
        this._discount = 0;
        this._itemsPrice = 0;
        this._finalPrice = 0;
        localStorage.getItem('deliveryPrice') == null ? this._deliveryPrice = 0 : this._deliveryPrice = Number(localStorage.getItem('deliveryPrice'));

        this._loadItems(items);
        this.setPrices();
        this.renderAll();
        this._activateElements();
    }

    private _loadItems(items :{id: number, name: string, category: string, price: number, quantity: number, image: string}[]): void 
    {
        items.forEach(item => {
          this._items.push(new Item(item, this));
        });
    }

    public setPrices(): void
    {
        this._setItemsPrice();
        this._setFinalPrice();
    }

    private _setItemsPrice(): void
    {
        this._itemsPrice = 0;
        this._items.forEach(item => {
            this._itemsPrice += item.price * item.quantity;
            console.log(this._itemsPrice);
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

    private _renderSelf(): void
    {
        this._elem.innerHTML = getTemplate(this);
        const options: NodeListOf<HTMLOptionElement> = document.querySelectorAll('.delivery-select option');
        options.forEach(option => {
            if(Number(option.value) == this._deliveryPrice ){
                option.setAttribute('selected', 'true');
            }
        });
    }

    private _renderItems() :void{  
        this._items.forEach(item => item.render('.items-list'));
    }

    public renderPrices(){
        this._elem.querySelector(".items-price")!.innerHTML = String(this._itemsPrice);
        this._elem.querySelector(".total-price")!.innerHTML = String(this._finalPrice);
    }

    public renderCounts(){
        this._elem.querySelectorAll(".item-count").forEach(count => {
            count.innerHTML = String(this._items.length);
        });
    }

    private _activateElements(): void
    {
        this._activateCouponInput();
        this._activateDeliverySelect();
    }

    private _activateCouponInput(): void{
        const couponInput :HTMLInputElement = this._elem.querySelector(".code-input")!;
        couponInput.onkeyup = (e) => {
            if(e.code === "Enter"){
                coupons.forEach(coupon => {
                    if(coupon.name == couponInput.value){
                        this._discount = coupon.discount;
                        this.setPrices();
                        this.renderPrices();
                        document.querySelector('.active-coupons')!.innerHTML = coupon.name;
                    }
                });
            }
        }
    }
    
    private _activateDeliverySelect(): void{
        const deliverySelect :HTMLSelectElement = this._elem.querySelector(".delivery-select")!;
        deliverySelect.onchange = () => {
            let value = deliverySelect.options[deliverySelect.selectedIndex].value;
            this._deliveryPrice = Number(value);
            this.setPrices();
            this.renderPrices();
            localStorage.deliveryPrice = this._deliveryPrice;
        };
    }

    public destroyItem(id: number): void{
        this._items.splice(this._items.findIndex(item => item.id == id), 1);
        this.refreshLocalStorage();
        this.setPrices();
        this.renderPrices();
        this.renderCounts();
    }

    private _toIndexedArray(items: Item[]){
        const itemsIndexedArray: {id: number, name: string, category: string, price: number, image: string, quantity: number}[] = [];
        items.forEach(item => {
            itemsIndexedArray.push({id: item.id, name: item.name, category: item.category, price: item.price, image: item.image, quantity: item.quantity});
        });
        return itemsIndexedArray;
    }

    public refreshLocalStorage(){
        localStorage.setItem('items', JSON.stringify(this._toIndexedArray(this._items)));
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

    public get elem(): HTMLElement{
        return this._elem;
    }
}