import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";

const API_URL = process.env.API_URL;

const getTodoList = async () => {
  try {
    const response = await fetch(`${API_URL}/api/todos`, {
      cache: "no-store",
    });
    return response.json();
  } catch (error) {
    console.log("Error on Loading todos: ", error);
  }
};

export default async function Home() {
  const { todos } = await getTodoList();

  return (
    <main className="min-h-screen flex flex-col items-center gap-4 bg-gradient-to-r from-indigo-100 via-red-100 to-yellow-100 ">
      <h1 className="mt-8 font-semibold text-lg">Demo for Todo List App</h1>
      <div>
        <AddTodo />
        <TodoList todos={todos} />
      </div>
    </main>
  );
}
