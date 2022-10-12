const dishes = document.getElementById('dishes')
const beverages = document.getElementById('beverages')
const desserts = document.getElementById('desserts')
const orderButton = document.getElementById('order-button')
const confirmButton = document.getElementById('confirm-btn')
const cancelButton = document.getElementById('cancel-btn')

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

const buildModalInformation = () => {
    const orderInfoElement = document.getElementById('order-info')
    const orderInfoArray = Array.from(orderInfoElement.children)
    const orderEntries = Object.keys(order)

    orderInfoArray.forEach((item, idx) => {
        if (idx > 2) return
        item.firstElementChild.innerHTML = order[orderEntries[idx]].name
        item.lastElementChild.innerHTML = `R$ ${order[orderEntries[idx]].value.toFixed(2).replace('.', ',')}`
    })

    orderInfoElement.lastElementChild.lastElementChild.innerHTML = `R$ ${(order.dishes.value+order.beverages.value+order.desserts.value).toFixed(2).replace('.', ',')}`
}

const toggleModal = () => {
    const modal = document.getElementById('modal')
    modal.classList.toggle('noshow')

    if (!modal.classList.contains('noshow')) {
        buildModalInformation()
    }
}

const enableOrderButton = () => {
    orderButton.classList.toggle('disabled')
    orderButton.classList.toggle('enabled')
    orderButton.innerHTML = 'Fechar pedido'
}

const makeOrder = () => {
    if (orderButton.classList.contains('disabled')) return

    const clientName = prompt('Qual seu nome?')
    const clientAdress = prompt('Qual seu endereço?')

    console.log('cheguei aqui')

    const ORDER_TEXT = `Olá, gostaria de fazer o seguinte pedido:
    - Prato: ${order.dishes.name}
    - Bebida: ${order.beverages.name}
    - Sobremesa: ${order.desserts.name}
    Total: R$ ${(order.beverages.value + order.desserts.value + order.dishes.value).toFixed(2)}
    
    Nome: ${clientName}
    Endereço: ${clientAdress}`

    const orderURIEncoded = encodeURIComponent(ORDER_TEXT)

    window.open(`https://wa.me/5511941471883?text=${orderURIEncoded}`, '_blank')
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
orderButton.addEventListener('click', toggleModal)
cancelButton.addEventListener('click', toggleModal)
confirmButton.addEventListener('click', makeOrder)