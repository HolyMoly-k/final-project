const heroForm = document.getElementById('hero-form')
const listShowHomes = document.querySelector('#list-show-homes')
const showHomes = document.querySelector('#show-homes')
const showHomesClose = document.getElementById('close-show-homes')
const showErrorTable = document.getElementById('error')

function showError() {
    showErrorTable.classList.add('show')
    setTimeout(() => {
        showErrorTable.classList.remove('show')
    }, 2000)
}


heroForm.addEventListener('submit', function(event) {
    event.preventDefault()
    const formData = new FormData(heroForm)
    const data = Object.fromEntries(formData)

    fetch('/api/houses', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response=>response.json())
    .then(houses => {
        listShowHomes.innerHTML = ``
        if (houses.length > 0) {
            houses.forEach(house => {
                listShowHomes.innerHTML += `
                    <li>
                        <img src="./img/discover-section/${house.image}" alt="${house.title}" width="244" height="138">
                        <h3 class="discover-list-item-title">${house.title}</h3>
                        <p class="discover-list-description">${house.location}</p>
                        <div class="discover-money-area-group">
                            <p class="discover-list-item-price">$${house.price}</p>
                            <p class="discover-list-item-area">${house.area}m<sup>2</sup> <span>Living Area</span></p>
                        </div>
                        <a href="#" class="discover-list-item-button">Send inquiry</a>
                    </li>
                `
            })
            showHomes.classList.add('open')
        }
        else {
            console.log('No found')
            showError()
        }
    })
    .catch(error=>console.log('Error:', error))
})

showHomesClose.addEventListener('click', function() {
    setTimeout(() => {
        showHomes.classList.remove('open')
    }, 200)
})