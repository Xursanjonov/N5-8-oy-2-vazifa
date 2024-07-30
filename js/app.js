const API_URL = 'http://localhost:8000';
const wrapper = document.querySelector('.wrapper');
// const form = document.querySelector('.form');
// const [title, price, url, category] = form.children

async function fetchData(api) {
    const response = await fetch(`${api}/products`);
    response
        .json()
        .then(res => createCard(res)).catch(err => console.log(err));
}
fetchData(API_URL);

function createCard(data) {
    console.log(data)

    data?.payload?.forEach(product => {
        let card = document.createElement('div');
        card.classList.add('cart');
        card.innerHTML = `
        <img src=${product?.url[0]} alt={$prod}>
        <h3>${product?.title}</h3>
        <div class="cart__btns">
            <button class="edit__btn" >Edit</button>
            <button class="delete__btn" >Delete</button>
        </div>
        `

        wrapper.appendChild(card);
    })
}
form.addEventListener('submit', (e) => {
    // e.preventDefault();
    const newProduct = {
        id: new Date().getTime(),
        title: title.value,
        price: +price.value,
        url: [url.value],
        category: category.value
    }
    if (title.value.trm()) {
        console.log(newProduct)
        fetch(`${API_URL}/products`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newProduct)
        })
            .then(res => res.json())
            .then(data => fetchData(data))
    }
})
wrapper.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.value === 'delete__btn') {

        fetch(`${API_URL}/products/${e.target.dataset.id}`, { method: 'DELETE' })
            .then(res => res.json())
            .then(data => fetchData(data))
    }
})
// NpqyPTO4D84t02yd