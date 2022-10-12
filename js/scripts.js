const dishes = document.getElementById('dishes')
const beverages = document.getElementById('beverages')
const desserts = document.getElementById('desserts')
const orderButton = document.getElementById('order-button')

const dishesArray = Array.from(dishes.children)
const beveragesArray = Array.from(beverages.children)
const dessertsArray = Array.from(desserts.children)

const order = {
    dishes: {
        name: '',
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
    orderButton.classList.toggle('disabled')
    orderButton.classList.toggle('enabled')
    orderButton.innerHTML = 'Fechar pedido'
}

const makeOrder = () => {
    if (orderButton.classList.contains('disabled')) return

    console.log('cheguei aqui')

    const ORDER_TEXT = `Olá, gostaria de fazer o seguinte pedido:
    - Prato: ${order.dishes.name}
    - Bebida: ${order.beverages.name}
    - Sobremesa: ${order.desserts.name}
    Total: R$ ${(order.beverages.value + order.desserts.value + order.dishes.value).toFixed(2)}`

    const orderURIEncoded = encodeURIComponent(ORDER_TEXT)

    window.location.href = `https://wa.me/5511941471883?text=${orderURIEncoded}`
}

const addProductInformationToOrder = (element) => {
    order[element.parentElement.id].name = element.querySelector('.option-name').innerHTML
    order[element.parentElement.id].value = Number(element.querySelector('.option-price').innerHTML.split('R$ ')[1].replace(',', '.'))
}

const createCheckMarker = () => {
    const CHECK_MARKER_DIRECTORY = './assets/green-check.svg'
    const img = document.createElement('img')
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
orderButton.addEventListener('click', makeOrder)