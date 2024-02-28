import EditForm from "@/components/EditForm"

interface IParams {
  params: {
    id: string
  }
}

const getTodo = async(id: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/todo/${id}`, {
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

const EditPage = async({ params }: IParams) => {
  const { id } = params
  const todo = await getTodo(id)
  return (
    <EditForm 
      {...todo}
    />
  )
}
export default EditPage