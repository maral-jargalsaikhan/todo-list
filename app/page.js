"use client";
import { useEffect, useState } from "react";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import { Segmented } from "antd";

const API_URL = process.env.API_URL;

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [selectedSegment, setSelectedSegment] = useState("all");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/todos`, {
          cache: "no-store",
        });

        const data = await response.json();
        setTodos(data.todos);
      } catch (error) {
        console.error("Error on Loading todos: ", error);
      }
    };
    fetchTodos();
  }, [todos]);

  const filteredTodos = todos.filter((todo) => {
    if (selectedSegment === "all") {
      return todos;
    } else {
      return todo.status === selectedSegment;
    }
  });

  return (
    <main className="min-h-screen flex flex-col items-center gap-4 bg-gradient-to-r from-indigo-100 via-red-100 to-yellow-100">
      <h1 className="mt-8 font-semibold text-lg">Demo for Todo List App</h1>
      <div>
        <AddTodo />
        <div className="w-full flex justify-center">
          <Segmented
            options={["all", "pending", "processing", "done"]}
            value={selectedSegment}
            onChange={(value) => setSelectedSegment(value)}
            className="my-3 bg-transparent"
          />
        </div>

        <TodoList todos={filteredTodos} />
      </div>
    </main>
  );
};

export default Home;
