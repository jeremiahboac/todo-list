import connectMongoDB from "@/libs/mongodb"
import Todo from "@/models/todo"
import { NextResponse } from "next/server"

interface IParams {
  params: {
    id: string
  }
}

export const dynamic = 'force-dynamic';

export const GET = async(request: Request, { params }: IParams) => {
  try {
    const { id } = params
    await connectMongoDB()
    const todo = await Todo.findById(id)
    return NextResponse.json(todo, {status: 200})
  } catch (error: any) {
    console.log(error.message)
  }
}

export const PATCH = async(request: Request, { params }: IParams) => {
  try {
    const { id } = params
    const { newTitle: title, newDescription: description } = await request.json()
    const todo = await Todo.findByIdAndUpdate({_id: id}, {
      title,
      description
    }, {
      new: true
    })
    return NextResponse.json(todo, {status: 200})
  } catch (error: any) {
    console.log(error.message)
  }
}