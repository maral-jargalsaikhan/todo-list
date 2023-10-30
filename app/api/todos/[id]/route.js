import connectMongoDB from "@/lib/connectMongoDB";
import Todo from "@/schema/Todo";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const todo = await Todo.findOne({ _id: id });
  return NextResponse.json({ todo }, { status: 200 });
}

export async function PUT(request, { params }) {
  const { id } = params;
  const {
    todo: todo,
    category: category,
    deadline: deadline,
  } = await request.json();

  await connectMongoDB();
  await Todo.findByIdAndUpdate(id, { todo, category, deadline });

  return NextResponse.json({ message: "Todo updated" }, { status: 200 });
}
