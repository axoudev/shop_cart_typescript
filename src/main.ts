import './style.css'

import {items} from './js/data';
import Cart from './components/Cart/Cart';


let cart: Cart = new Cart('#app', items);

