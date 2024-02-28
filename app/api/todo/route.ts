import Todo from "@/models/todo"
import connectMongoDB from "@/libs/mongodb"
import { NextRequest, NextResponse } from "next/server"

export const dynamic = 'force-dynamic';

export const POST = async(request: Request) => {
  try {
    const { title, description } = await request.json()
    await connectMongoDB()
    await Todo.create({
      title,
      description
    })
    return NextResponse.json({message: "You're new todo is successfully added!"}, {status: 201})
  } catch (error: any) {
    console.log(error.message)
  }
}

export const GET = async() => {
  try {
    await connectMongoDB()
    const todos = await Todo.find().sort({createdAt: -1})
    return NextResponse.json({todos})
  } catch (error: any) {
    console.log(error.message)
  }
}

export const DELETE = async(request: NextRequest) => {
  try {
    const id = request.nextUrl.searchParams.get('id')
    await connectMongoDB()
    await Todo.findByIdAndDelete(id)
    return NextResponse.json({
      message: 'Successfully deleted the todo'
    })
  } catch (error: any) {
    console.log(error.message)
  }
}