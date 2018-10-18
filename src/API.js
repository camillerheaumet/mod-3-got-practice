class API {
    static getKids(){
        return fetch('http://localhost:3000/characters')
            .then(response => response.json())
    }

    static getFoods(){
        return fetch('http://localhost:3000/foods')
            .then(response => response.json())
    }

    static updateStatusAndFoodList(id, status, foodList) {
        return fetch(`http://localhost:3000/characters/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'status': status,
                'foodList': foodList
            })
        }).then(response => response.json())
    }
}