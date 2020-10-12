  const addItems = document.querySelector('.add-items')
  const itemsList = document.querySelector('.plates')
  const buttons = document.querySelectorAll('button')
  const items = JSON.parse(localStorage.getItem('items')) || []

  function addPlate(e) {
    e.preventDefault()
    const value = this.querySelector('[type="text"]').value
    const newItem = {
      value: value,
      done: false
    }
    items.push(newItem)
    localStorage.setItem('items', JSON.stringify(items))
    this.reset()
    populateList(items, itemsList)
  }

  function populateList(plates = [], platesList) {
    platesList.innerHTML = plates.map((item, index) => {
      return `<li>
        <input type="checkbox" id="item_${index}" ${item.done ? 'checked' : ''} data-index=${index}>
        <label for="item_${index}">${item.value}</label>
      </li>`
    }).join('')
  }

  function checkPlate(e) {
    if (!e.target.matches('input')) return
    const index = e.target.dataset.index
    items[index].done = !items[index].done
    localStorage.setItem('items', JSON.stringify(items))
  }

  function checkAll(e) {
    const check = e.target.dataset.check ? true : false
    items.forEach(item => item.done = check)
    populateList(items, itemsList)
    localStorage.setItem('items', JSON.stringify(items))
  }

  populateList(items, itemsList)
  buttons.forEach(button => button.addEventListener('click', checkAll))
  itemsList.addEventListener('click', checkPlate)
  addItems.addEventListener('submit', addPlate)