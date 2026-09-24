const buttons = document.querySelectorAll('.hero-button-list button')
const form = document.getElementById('hero-form')
const rentButton = document.getElementById('hero-rent-button')
const select = document.getElementById('price');

buttons.forEach((button) => {
    button.addEventListener('click', function() {
        buttons.forEach(btn => btn.classList.remove('hero-buy-button'))
        this.classList.add('hero-buy-button')

        if (rentButton.classList.contains('hero-buy-button')){
          select.options[0].value = '100-200';
          select.options[0].text = '$100-$200';

          select.options[1].value = '200-400';
          select.options[1].text = '$200-$400';

          select.options[2].value = '400+';
          select.options[2].text = '$400+';
        }
        else {
          select.options[0].value = '500-750';
          select.options[0].text = '$500-$750';

          select.options[1].value = '750-1200';
          select.options[1].text = '$1200-$750';

          select.options[2].value = '1200+';
          select.options[2].text = '$1200+';
        }
    })
})
  

const arrowUp = document.getElementById('arrow-up')
window.addEventListener('scroll', () => {
  if (window.scrollY >= 700) {
    arrowUp.classList.add('arrow-active')
  } else {
    arrowUp.classList.remove('arrow-active')
  }
})

const burgerMenu = document.getElementById('navigation-burger')
const navMenu = document.getElementById('navigation-menu')
const burgerTrigger = document.getElementById('burger-trigger')
const navList = document.querySelectorAll('#nav-list a')

burgerMenu.addEventListener('click', function(){
  navMenu.classList.toggle('open')
  burgerTrigger.classList.toggle('open')
})

burgerTrigger.addEventListener('click', function(){
  navMenu.classList.remove('open')
  burgerTrigger.classList.remove('open')
})

navList.forEach((a) => {
  a.addEventListener('click', function() {
    navMenu.classList.remove('open')
    burgerTrigger.classList.remove('open')
  })
})