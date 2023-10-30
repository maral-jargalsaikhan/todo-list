"use client";
import { useEffect, useState } from "react";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";

const Home = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/todos", {
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

  return (
    <main className="min-h-screen flex flex-col items-center gap-4 bg-gradient-to-r from-indigo-100 via-red-100 to-yellow-100">
      <h1 className="mt-8 font-semibold text-lg">Demo for Todo List App</h1>
      <div>
        <AddTodo />
        <TodoList todos={todos} />
      </div>
    </main>
  );
};

export default Home;
