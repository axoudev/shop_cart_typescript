import Item from '../Item/Item';
import getTemplate from './template';

export default class Cart{
    private _items: Item[];
    private _discount: number;
    private _elem: HTMLElement;

    constructor(elem: string, items: {id: number, name: string, category: string, price: number, quantity: number}[], discount: number = 0){
        this._items = [];
        this._discount = discount;
        this._elem = document.querySelector(elem)!;
        this._loadItems(items);
        this.renderAll();
    }

    private _loadItems(items :{id: number, name: string, category: string, price: number, quantity: number}[]) :void {
        items.forEach(item => {
          this._items.push(new Item(item, this));
        });
      }

    public renderAll(): void
    {
        this._renderSelf();
        this._renderItems();
        this._renderItemsCount();
    }

    private _renderSelf(): void
    {
        this._elem.innerHTML = getTemplate(this);
    }

    private _renderItems() :void{  
        this._items.forEach(item => item.render('.items-list'));
    }

    private _renderItemsCount() :void{
        const countElem :HTMLElement = document.querySelector(".item-count strong")!;
        countElem.innerText = this._items.length.toString();
      }

    // ------------------------------
    // GETTERS
    // ------------------------------

    public get items(): Item[]{
        return this._items
    }
}