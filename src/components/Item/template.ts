import Item from './Item';

export default function getTemplate(item: Item) :string
{
    return `
    <div class="row border-top border-bottom">
        <div class="row main align-items-center">
            <div class="col-2">
            <img
                class="img-fluid"
                src="http://placeimg.com/102/102/people"
            />
            </div>
            <div class="col">
            <div class="row text-muted">${item.category}</div>
            <div class="row">${item.name}</div>
            </div>
            <div class="col">
            <select class="select">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            </div>
            <div class="col">&euro; ${item.price}</div>
            <div>
            <a href="#">
                <i class="fa-solid fa-circle-xmark"></i>
            </a>
            </div>
        </div>
        </div>
    `;

}