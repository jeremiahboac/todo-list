'use client'

import { useRouter } from "next/navigation"
import { ChangeEvent, FormEvent, useState } from "react"

interface IProps {
  _id: string
  title: string
  description: string
}

const EditForm = ({ _id, title, description }: IProps) => {
  const router = useRouter()
  const [todo, setTodo] = useState({
    title,
    description
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setTodo(prevState => {
      return {
        ...prevState,
        [name]: value
      }
    })
  }

  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      if(!todo.title || !todo.description) {
        alert('Please fill up all the fields.')
        return
      }

      const res = await fetch(`/api/todo/${_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          newTitle: todo.title,
          newDescription: todo.description
        })
      })

      if(!res.ok) {
        throw new Error('Something went wrong...')
      }

      router.push('/')
      router.refresh()
    } catch (error: any) {
      console.log(error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 border border-gray-600 mt-2 p-4">
      <label htmlFor="title">Title:</label>
      <input 
        type="text" 
        name="title"
        id="title"
        className="border border-gray-500 rounded-md py-1 px-2"
        value={todo.title}
        onChange={handleChange}
      />
      <label htmlFor="description">Description:</label>
      <textarea 
        name="description" 
        id="description" 
        rows={8}
        className="border border-gray-500 resize-none rounded-md py-1 px-2"
        value={todo.description}
        onChange={handleChange}
      >
      </textarea>
      <button className="bg-emerald-400 hover:bg-emerald-500 text-white p-2 font-semibold rounded-lg mt-1">Update</button>
    </form>
  )
}
export default EditForm