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
    if (todo != "") {
      // add the todo to the list
      setList([...list, newTodo])
      // clear input box
      setInput("")
    }
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
    if (list.length > 0){
      changeMode(true)
      changeStateList([...list])
    } else {
      alert("Добавь хотя бы 1 пункт")
    }
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

  const reset = () => {
    setList([])
    changeStateList([])
    changeMode(false)
    setTask1({id: 0, todo: ""})
    setTask2({id: 0, todo: ""})
    setBest(null)
  }

  if (!is_game_mode && best == null) {
    return (
      <div class="center">
        <h1>Выбиратор 3000</h1>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button class="buttonchoose" onClick={() => addTodo(input)}>Добавить</button>
        <button class="buttonchoose" onClick={() => updateStates()}>ВЫБРАТЬ!!!!</button>
        <ul>
          {list.map((todo) => (
            <li class="text" key={todo.id}>
              {todo.todo}
              <button class="buttondelete" onClick={() => deleteTodo(todo.id)}>&#10060;</button>
            </li>
          ))}
        </ul>
      </div>
    )
  } else if (is_game_mode && best == null) {
    return (
      <div class="center">
        <h1>Выбери то что тебе нравится больше</h1>
        <button class="buttonchoose" onClick={() => deleteTodo(task1.id)}>{task1.todo}</button>
        <text>ПРОТИВ</text>
        <button class="buttonchoose" onClick={() => deleteTodo(task2.id)}>{task2.todo}</button>
      </div>
    )
  } else if (best != null){
    return (
      <div class="center">
        <h1>Тебе точно нужно выбрать вот это!!!!</h1>
        <button class="buttonchoose" onClick={() => reset()}>Заново</button>
        <h1>{best.todo}</h1>
      </div>
    )
  }
}

export default App
