import React, { useState, useEffect} from "react"

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function App() {
  const [list, setList] = useState([])
  const [input, setInput] = useState("")
  const [stateList, changeStateList] = useState([])
  const [task1, setTask1] = useState({id: 0, todo: ""})
  const [task2, setTask2] = useState({id: 0, todo: ""})
  const [is_game_mode, changeMode] = useState(false)
  const [best, setBest] = useState(null)

  useEffect(() => {
    startFight()
  }, [stateList])


  const addTodo = (todo) => {
    const newTodo = {
      id: Math.floor(Math.random() * 100),
      todo: todo,
    }

    // add the todo to the list
    setList([...list, newTodo])
    // clear input box
    setInput("")
  }

  const deleteTodo = (id) => {
    // Filter out todo with the id
    if (!is_game_mode) {
      const newList = list.filter((todo) => todo.id !== id)
      setList(newList)
    } else {
      if (id == task1.id){
        changeStateList(stateList.filter((todo) => todo.id !== task2.id))
      } else {
        changeStateList(stateList.filter((todo) => todo.id !== task1.id))
      }
    }
  }

  function updateStates() {
    changeMode(true)
    changeStateList([...list])
  }

  function startFight() {
    if (stateList.length > 1) {
      let i = getRandomInt(stateList.length)
      let todo1 = stateList[i]
      setTask1(stateList[i])
      let j = getRandomInt(stateList.length)
      while (j == i){
        j = getRandomInt(stateList.length)
      }
      let todo2 = stateList[j]
      setTask2(stateList[j])
      setList([todo1, todo2])
    } else {
      setBest(stateList[0])
    }
  }

  const reset =() => {
    setList([])
    changeStateList([])
    changeMode(false)
    setBest(null)
  }

  if (!is_game_mode && best == null) {
    return (
      <div>
        <h1>Выбиратор 3000</h1>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={() => addTodo(input)}>Add</button>
        <button onClick={() => updateStates()}>Start Choosing</button>
        <ul>
          {list.map((todo) => (
            <li key={todo.id}>
              {todo.todo}
              <button onClick={() => deleteTodo(todo.id)}>&times;</button>
            </li>
          ))}
        </ul>
      </div>
    )
  } else if (is_game_mode && best == null) {
    return (
      <div>
        <h1>Выбери то что тебе нравится больше</h1>
        <button onClick={() => deleteTodo(task1.id)}>{task1.todo}</button>
        <text>ПРОТИВ</text>
        <button onClick={() => deleteTodo(task2.id)}>{task2.todo}</button>
      </div>
    )
  } else if (best != null){
    return (
      <div>
        <h1>Тебе точно нужно выбрать вот это!!!!</h1>
        <button onClick={() => reset()}>Заново</button>
        <ul>
          <li>
            {best.todo}
          </li>
        </ul>
      </div>
    )
  }
}

export default App
