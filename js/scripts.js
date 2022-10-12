const dishes = document.getElementById('dishes')
const beverages = document.getElementById('beverages')
const desserts = document.getElementById('desserts')

const dishesArray = Array.from(dishes.children)
const beveragesArray = Array.from(beverages.children)
const dessertsArray = Array.from(desserts.children)

console.log(Number(dessertsArray[0].querySelector('.option-price').innerHTML.split('R$ ')[1].replace(',', '.')))

const order = {
    dishes: {
        name:'',
        value: 0
    },
    beverages: {
        name: '',
        value: 0
    },
    desserts: {
        name: '',
        value: 0
    }
}

const enableOrderButton = () => {
    console.log('entrei aqui')
    const orderButton = document.getElementById('order-button')
    orderButton.classList.toggle('disabled')
    orderButton.classList.toggle('enabled')
    orderButton.innerHTML = 'Fechar pedido'
}

const addProductInformationToOrder = (element) => {
    order[element.parentElement.id].name = element.querySelector('.option-name').innerHTML
    order[element.parentElement.id].value = Number(element.querySelector('.option-price').innerHTML.split('R$ ')[1].replace(',', '.'))
    console.log(order)
}

const createCheckMarker = () =>  {
    const CHECK_MARKER_DIRECTORY = './assets/green-check.svg'
    const img  = document.createElement('img')
    img.src = CHECK_MARKER_DIRECTORY
    return img
} 

const addCheckMarker = (element) => {
    if (element.lastElementChild.lastElementChild.tagName === 'IMG') return
    const checkMarker = createCheckMarker()
    element.lastElementChild.append(checkMarker)
}

const removeCheckMarker = (element) => {
    if (element.lastElementChild.lastElementChild.tagName !== 'IMG') return
    element.lastElementChild.lastElementChild.remove()
}

const selectOption = (element) => {

    const section = element.parentElement
    Array.from(section.children).forEach(card => {
        card.classList.remove('selected')
        removeCheckMarker(card)
    })

    element.classList.add('selected')
    addCheckMarker(element)
    addProductInformationToOrder(element)

    if (order.dishes.value && order.desserts.value && order.beverages.value) {
        enableOrderButton()
    }
}

dishesArray.forEach(card => card.addEventListener('click', () => selectOption(card)))
beveragesArray.forEach(card => card.addEventListener('click', () => selectOption(card)))
dessertsArray.forEach(card => card.addEventListener('click', () => selectOption(card)))