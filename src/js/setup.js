import _ from 'lodash'
import { getFirstVisibleChild, maintainContext } from './scroll'

export default function() {
  console.log('setup')
  let list = document.getElementById('list')

  for (let i = 0; i < 100; i++) {
    let li = document.createElement('li')

    li.setAttribute('id', 'item-' + i)

    li.appendChild(document.createTextNode(i))

    list.appendChild(li)
  }

  let isHidden = false

  function toggleItems() {
    isHidden = !isHidden

    document.getElementById('state').textContent = isHidden

    for (let i = 10; i < 20; i++) {
      let li = document.getElementById('item-' + i)
      li.classList.toggle('hidden', isHidden)
    }
  }

  document.getElementById('toggle').addEventListener('click', () => {
    maintainContext(list, toggleItems)
    // toggleItems()
  })

  document.getElementById('first').addEventListener('click', () => {
    console.log(getFirstVisibleChild(list))
  })
}
