const discoverList = document.querySelector('#discover-list')

fetch('/api/houses')
    .then(response=>response.json())
    .then(houses=> {
        discoverList.innerHTML = ''
        houses.forEach(house => {
            discoverList.innerHTML += `
                <li>
                    <img src="./img/discover-section/${house.image}" alt="${house.title}" width="344" height="238">
                    <h3 class="discover-list-item-title">${house.title}</h3>
                    <p class="discover-list-description">${house.location}</p>
                    <div class="discover-money-area-group">
                        <p class="discover-list-item-price">$${house.price}</p>
                        <p class="discover-list-item-area">${house.area}m<sup>2</sup> <span>Living Area</span></p>
                    </div>
                    <a href="#" class="discover-list-item-button">Send inquiry</a>
                </li>
            `
        });
    })
    .catch(error=>console.error('Ошибка загрузки домов:', error))