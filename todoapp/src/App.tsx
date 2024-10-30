import React, { useState } from 'react'
import './App.css'
import data from './lists.json'

interface ListsItem {
  type: string
  name: string
}

function App() {
  const [auto, setAuto] = useState<{[key: string]: ReturnType<typeof setTimeout>}>({})

  const todo = (e: Event | React.MouseEvent<HTMLElement>) => {
    const elem: HTMLElement = e.target as HTMLElement
    const isCheck: boolean = elem.dataset.check === 'true'
    const type: string | undefined = elem.dataset.listType?.toLowerCase()
    let targetTypeElem: null | HTMLElement = null

    if (isCheck) {
      // go back to lists
      targetTypeElem = document.querySelector(`.listsWrapper`)

      // clear timeout if it in to-do list
      clearInterval(auto[`${elem.dataset.id}`])
    } else {
      // go to to-do lists
      targetTypeElem = document.querySelector(`.typeWrapper[data-type=${type}]`)

      // set timeout for each
      const settime = setTimeout(() => {
        todo(e)
      }, 5000)

      // update state
      setAuto(prev => ({ ...prev, [`${elem.dataset.id}`]: settime }))
    }

    elem.dataset.check = (!isCheck).toString()
    targetTypeElem?.appendChild(elem)
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-4'>
          <ul className='listsWrapper'>
            {
              data.lists.map((item: ListsItem, i: number) => (
                <li className='listItem' key={i} data-id={i} data-list-type={item.type} data-check={false} onClick={todo}>{item.name}</li>
              ))
            }
          </ul>
        </div>
        <div className='col-4'>
          <ul className='typeWrapper' data-type='fruit'>
            <li className='headType'>Fruit</li>
          </ul>
        </div>
        <div className='col-4'>
          <ul className='typeWrapper' data-type='vegetable'>
            <li className='headType'>Vegetable</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App
