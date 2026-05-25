const buttons = document.querySelectorAll('.hero-button-list button')
const form = document.getElementById('hero-form')
const rentButton = document.getElementById('hero-rent-button')
const arrowUp = document.getElementById('arrow-up')
const linkMore = document.getElementById('customer_link-more')
const customerWindow = document.getElementById('customer_window')
const customerWindowClose = document.getElementById('customer_window-close')
let buttonActive;

buttons.forEach((button) => {
    button.addEventListener('click', function() {
        buttons.forEach(btn => btn.classList.remove('hero-buy-button'))
        this.classList.add('hero-buy-button')
        if (rentButton.classList.contains('hero-buy-button')) {
            form.classList.add('hero-form-rent')
        } else {
            form.classList.remove('hero-form-rent')
        }
    })
})

window.addEventListener('scroll', () => {
  if (window.scrollY >= 700) {
    arrowUp.classList.add('arrow-active')
  } else {
    arrowUp.classList.remove('arrow-active')
  }
})

linkMore.addEventListener('click', function() {
  customerWindow.classList.add('customer_window-active')
  customerWindowClose.classList.add('customer_window-close-active')
  customerWindowClose.addEventListener('click', function() {
    customerWindow.classList.remove('customer_window-active')
    customerWindowClose.classList.remove('customer_window-close-active')
  })
})