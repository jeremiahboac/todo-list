import Todo from "./Todo"
import { ITodo } from '../types/todo'

const getTodos = async() => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/todo`, {
      cache: 'no-store'
    })
    
    if(!res.ok) {
      throw new Error('Something went wrong...')
    }

    return res.json()
  } catch (error: any) {
    console.log(error.message)
  }
}


const Todos = async() => {
  const { todos } = await getTodos()

  if(!todos.length) {
    return <div className=" text-center mt-4">
      <h3>You don't have a to-do yet.</h3>
    </div>
  }

  return (
    <div>
      {todos.map((todo: ITodo) => (
        <Todo key={todo._id} {...todo}/>
      ))}
    </div>
  )
}

export default Todos