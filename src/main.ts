import './style.css'

import {baseItems} from './js/data';
import Cart from './components/Cart/Cart';

if(localStorage.getItem('items') === null){
    localStorage.setItem('items', JSON.stringify(baseItems));
}

const items = JSON.parse(localStorage.getItem('items')!);

let cart: Cart = new Cart('#app', items);

