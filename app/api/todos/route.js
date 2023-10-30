import connectMongoDB from "@/lib/connectMongoDB";
import Todo from "@/schema/Todo";
import { NextResponse } from "next/server";

export async function GET() {
  //   console.log("GET REQUEST");
  await connectMongoDB();
  const todos = await Todo.find();
  return NextResponse.json({ todos });
}

export async function POST(request) {
  //   console.log("POST REQUEST");
  const { todo, category, deadline, status } = await request.json();
  await connectMongoDB();
  await Todo.create({ todo, category, deadline, status });
  return NextResponse.json({ message: "Todo created" }, { status: 201 });
}

export async function DELETE(request) {
  //   console.log("DELETE REQUEST");
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Todo.findByIdAndDelete(id);
  return NextResponse.json({ message: "Todo deleted" }, { status: 200 });
}
