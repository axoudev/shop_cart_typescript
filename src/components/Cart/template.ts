import Cart from "./Cart";

export default function getTemplate(data: Cart): string
{
    return `
    <div class="row">
        <div class="col-md-8 cart">
          <div class="title">
            <div class="row">
              <div class="col">
                <h4><b>Shopping Cart</b></h4>
              </div>
              <div class="col align-self-center text-right text-muted">
                3 items
              </div>
            </div>
          </div>
          
          <div class="items-list">
            <!-- ITEMS LIST-->
          </div>
          
          <div class="back-to-shop">
            <a href="#">&leftarrow;</a
            ><span class="text-muted">Back to shop</span>
          </div>
        </div>
        <div class="col-md-4 summary">
          <div>
            <h5><b>Summary</b></h5>
          </div>
          <hr />
          <div class="row">
            <div class="col" style="padding-left: 0">3 ITEMS</div>
            <div class="col text-right">&euro; 155.00</div>
          </div>
          <form action="#">
            <p>SHIPPING</p>
            <select>
              <option class="text-muted" value="0" disabled selected>
                Choose your delivery
              </option>
              <option class="text-muted" value="5">
                Standard-Delivery- &euro;5.00
              </option>
              <option class="text-muted" value="10">
                Express-Delivery- &euro;10.00
              </option>
            </select>
            <p>GIVE CODE [10% reduction]</p>
            <input type="text" placeholder="Your code here " />
          </form>
          <div
            class="row"
            style="border-top: 1px solid rgba(0, 0, 0, 0.1); padding: 2vh 0"
          >
            <div class="col">TOTAL PRICE</div>
            <div class="col text-right">&euro; 175.50</div>
          </div>
          <button class="btn">CHECKOUT</button>
        </div>
      </div>
  `;
}