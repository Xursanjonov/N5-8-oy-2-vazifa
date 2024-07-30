const API_URL = 'http://localhost:8000';
const wrapper = document.querySelector('.wrapper');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');
const userForm = document.querySelector('.user__form');
const addUser = document.querySelector('.add__user');
const empty = 'https://thumbs.dreamstime.com/b/laptop-computer-user-icon-vector-isolated-white-person-work-online-pictogram-business-worker-analyst-student-coder-customer-316853739.jpg'
function handleDelete(userId, card) {
    const confirmDelete = confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
        deleteUser(userId, card);
    }
}
async function deleteUser(userId, card) {
    try {
        const response = await fetch(`${API_URL}/users/${userId}`, { method: 'DELETE' });
        if (response.ok) {
            card.remove();
            console.log(`User with ID ${userId} deleted.`);
        } else {
            console.error('Failed to delete user.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
async function fetchData(api) {
    try {
        const response = await fetch(`${api}/users`);
        const data = await response.json();
        createUser(data)
    } catch (er) { console.error(er); }
}
fetchData(API_URL)
function createUser(data) {
    // console.log(data.payload[0])

    data?.payload?.forEach(user => {
        let card = document.createElement('div');
        card.classList.add('user__cart');
        card.innerHTML = `
        <img class="user__img" src=${user?.image} alt="">
        <div class="user__info">
            <li> <span>Full name:</span> <p>${user?.fullName}</p></li>
            <li> <span>Age:</span> <p>${user?.age}</p></li>
            <li> <span>Phone:</span> <p>${user?.phone}</p></li>
            <li> <span>Username:</span> <p>${user?.username}</p></li>
            <li> <span>Email:</span> <p>${user?.email}</p></li>
            <li> <span>Address:</span> <p>${user?.address}</p></li>
        </div>
        <div class="cart__btns">
            <button class="edit__btn" >Edit</button>
            <button class="delete__btn" >Delete</button>
        </div>
        `

        card.querySelector('.delete__btn').addEventListener('click', () => handleDelete(user.id, card));
        wrapper.appendChild(card);
    })
}
addUser.addEventListener('click', (e) => {
    e.preventDefault()
    modal.style = 'display:block';
    overlay.style = 'display:block';
})
overlay.addEventListener('click', (e) => {
    e.preventDefault()
    modal.style = 'display:none';
    overlay.style = 'display:none';
})