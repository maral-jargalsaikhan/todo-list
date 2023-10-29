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
    <main>
      <h1>Demo for Todo List App</h1>
      <div>
        <TodoList />
      </div>
    </main>
  );
}
