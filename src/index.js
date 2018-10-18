const kidsColl = document.querySelector('#kids-collection')
const selectTagKids = document.querySelector('#kidsSelect')
const selectTagFoods = document.querySelector('#foodsSelect')
const feedKid = document.querySelector('.add-food-in-kid-form')
const allFoods = []
const allKids = []

API.getFoods().then(foods => {
    foods.forEach(food => {
        allFoods.push(food)
    })
})

function appendKids(kids){  
    kids.forEach(kid => {
        appendKid(kid)
        allKids.push(kid)
    })
}

function appendKid(kid){
    const kidDiv = document.createElement('div')
    if (!kid.status){
        kid.status = 0
    }

    if (!kid.foodList){
        kid.foodList = []
    }

    kidDiv.innerHTML = `
    <div  class="card">
        <h2>${kid.name}</h2>
        <img src=${kid.img} class="kid-avatar">
        <p>${kid.appetite} appetite points</p>
        <p id='statusTag-${kid.id}'>${hungry(kid.status, kid.appetite)}  </p>
        <ul id='listTag-${kid.id}'>Food eaten:
            ${foodsEaten(kid.foodList)}
        </ul>
    </div>
    `

    kidsColl.appendChild(kidDiv)
}

function createOptions(opts, select) {
        opts.forEach(Opt => {
        const options = document.createElement('option')
        options.innerHTML = `<option value="${Opt.id}">${Opt.name}</option>`
        select.appendChild(options)
        })

}

function foodsEaten(list){
    if (list.length > 0){
        return list.map(food => `<li>${food.name}</li>`).join('')
    } else {
        return "That kid's stomac is empty! ¯|_(ツ)_/¯"
    }
}

function hungry(status, appetite){
    if (status < appetite){
        return "I'm hungry"
    } else {
        return "I'm full"
    }
}

feedKid.addEventListener('submit', event => {
    event.preventDefault()

    const kidId = selectTagKids.options.selectedIndex
    const foodId = selectTagFoods.options.selectedIndex
    const newFood = allFoods[foodId - 1]
    const kid = allKids[kidId-1]
    
    kid.status = parseInt(kid.status) + parseInt(newFood.sustanance)
    kid.foodList.push(newFood)

    API.updateStatusAndFoodList(kid.id, kid.status, kid.foodList)

    //find the elements you need to update
    const pTag = document.querySelector(`#statusTag-${kid.id}`)
    const ulTag = document.querySelector(`#listTag-${kid.id}`)

    //change inner text === new status and new food
 
    pTag.innerHTML = `${hungry(kid.status, kid.appetite)}`
    ulTag.innerHTML = `Food eaten:${foodsEaten(kid.foodList)}`

    //be happy

})


API.getKids().then(kids =>  createOptions(kids, selectTagKids))
API.getFoods().then(foods =>  createOptions(foods, selectTagFoods))

API.getKids().then(kids => appendKids(kids))