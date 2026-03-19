import { useState, useEffect } from 'react'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [count, setCount] = useState(0)

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      // let todos = JSON.parse(localStorage.getItem("todos"))
      let todos = JSON.parse(todoString)
      setTodos(todos)
    }
  }, [])


  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }


  const toggleFinished = (params) => {
    setshowFinished(!showFinished)
  }


  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)

    //const t = todos.find(i => i.id === id);  // returns the object directly
    // setTodo(t.todo);// no need for [0]

    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLS()
  }


  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLS()
  }


  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    console.log(todos)
    saveToLS()
  }


  const handleChange = (e) => {
    setTodo(e.target.value)
  }


  const handleCheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => {
      return item.id === id;
    }
    )
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    saveToLS()
  }


  return (
    <>
      <Navbar />
      <div className="mx-3 md:container max-w-7xl md:mx-auto my-5 rounded-xl p-5 bg-pink-100 min-h-[80vh] md:w-[35%] shadow-2xl">
        <h1 className='font-bold text-center text-2xl my-2.5'>iTask - Manage your todos at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-lg font-bold my-2'>Add a Todo</h2>
          
          <input onChange={handleChange} value={todo} type="text" className='bg-amber-50 w-full border-2 rounded-full px-5 py-1.5' />
          <button onClick={handleAdd} disabled={todo.length <= 3} className='bg-fuchsia-900  hover:bg-fuchsia-950 p-2 py-1 text-sm font-medium text-white rounded-md w-20 mx-auto ' >Save</button>
        </div>
        <input className='my-4' onChange={toggleFinished} type="checkbox" checked={showFinished} />

         <label className='mx-2 font-mono' htmlFor="show">Show Finished</label>
        <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>

        <h2 className='text-xl font-bold'>Your Todos</h2>

        <div className="todos">
          {todos.length === 0 && <div className='my-4 font-mono text-xl text'>No Todos to display</div>}
          {todos.map(item => {

            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex my-3 justify-between">
              <div className='flex gap-5'>
                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="button flex h-full">
                <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-fuchsia-900 hover:bg-fuchsia-950 p-2 py-1 text-sm font-medium text-white rounded-md mx-2 '><FaEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-fuchsia-900 hover:bg-fuchsia-950 p-2 py-1 text-sm font-medium text-white rounded-md mx-2 '><MdDelete />
                </button>
              </div>
            </div>
          })}

        </div>
      </div>
    </>
  )
}

export default App
