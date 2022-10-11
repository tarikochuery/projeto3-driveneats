const dishes = document.getElementById('dishes')
const beverages = document.getElementById('beverages')
const deserts = document.getElementById('deserts')

const dishesArray = Array.from(dishes.children)
const beveragesArray = Array.from(beverages.children)
const desertsArray = Array.from(deserts.children)

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
    console.log(section)
    Array.from(section.children).forEach(card => {
        card.classList.remove('selected')
        removeCheckMarker(card)
    })

    element.classList.add('selected')
    addCheckMarker(element)
}

dishesArray.forEach(card => card.addEventListener('click', () => selectOption(card)))
beveragesArray.forEach(card => card.addEventListener('click', () => selectOption(card)))
desertsArray.forEach(card => card.addEventListener('click', () => selectOption(card)))