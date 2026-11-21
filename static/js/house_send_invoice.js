const contactsForm = document.getElementById('contacts-form')
const showForm = document.getElementById('show-form')

contactsForm.addEventListener('submit', function(event) {
    event.preventDefault()
    const formData = new FormData(contactsForm)
    const data = Object.fromEntries(formData)
    const showResult = document.getElementById('show-result')

    fetch('/api/request', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            showResult.classList.add('apply')
            showResult.textContent = 'Заявка успешно отправлена!'
            setTimeout(() => {
                showResult.classList.remove('apply')
                showResult.textContent = ''
            }, 2000)
            contactsForm.reset()
            showForm.classList.remove('open')
        } else {
            showResult.classList.add('cancel')
            showResult.textContent = 'Ваш email или номер телефона уже использовались в заявке'
            setTimeout(() => {
                showResult.classList.remove('cancel')
                showResult.textContent = ''
            }, 2000)
            showForm.classList.remove('open')
        }
    })
    .catch(err => {
        console.error(err)
        alert('Error')
    })
})