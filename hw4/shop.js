async function fetchProducts() { //функция для получения данных из файла shop.json
    const response = await fetch('shop.json');
    const products = await response.json();
    return products;
}

function displayProducts(products) { //функция, которая отвечает за отображение товаров на странице в виде карточек
    const nodeForInsert = document.getElementById('node_for_insert');
    nodeForInsert.innerHTML = '';

    products.forEach(product => {
        nodeForInsert.innerHTML += `
            <li style="width: 300px" class="card m-2 p-3">
                <img src="${product.img}" class="card-img-top" alt="${product.title}" style="height: 200px;">
                <div class="card-body">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text">${product.description}</p>
                    <p class="card-text">Цена: ${product.price} р.</p>
                </div>
            </li>
        `;
    });
}

async function sortItems() { //функция для сортировки товаров по цене или названию
    const products = await fetchProducts();
    const sortByPrice = document.getElementById('price').checked;
    const sortByTitle = document.getElementById('title').checked;

    if (sortByPrice) {
        products.sort((a, b) => a.price - b.price);
    }

    if (sortByTitle) {
        products.sort((a, b) => a.title.localeCompare(b.title));
    }

    displayProducts(products);
}

window.onload = sortItems;// загрузка товаров при первой загрузке страницы