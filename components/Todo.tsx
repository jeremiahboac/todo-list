'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { HiPencilAlt } from 'react-icons/hi'
import { MdDeleteOutline } from 'react-icons/md'
import { ITodo } from '@/types/todo'


const Todo = ({ _id, title, description }: ITodo) => {
  const router = useRouter()

  const handleClick = async(id: string) => {
    try {
      const confirmed = confirm('Are you sure you want to delete this to-do?')
      if(confirmed) {
        const res = await fetch(`/api/todo?id=${id}`, {
          method: 'DELETE'
        })
    
        if(!res.ok) {
          throw new Error('Something went wrong...')
        } else {
          router.refresh()
        }
      }
    } catch (error: any) {
      console.log(error.message)
    }
  }
  
  return (
    <div className="border border-gray-500 mt-2 p-2 rounded-md">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-lg capitalize">{title}</h1>
        <div className="flex gap-2 items-center">
          <Link href={`/edit/${_id}`}>
            <HiPencilAlt size={20}/>
          </Link>
          <button type='button' onClick={() => handleClick(_id)}>
            <MdDeleteOutline size={22} />
          </button>
        </div>
      </div>
      <p className=" text-gray-700">{description}</p>
    </div>
  )
}
export default Todo