import { DeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm, message } from "antd";

const API_URL = process.env.API_URL;

const DeleteTodo = ({ id }) => {
  const deleteTodo = async () => {
    try {
      await fetch(`${API_URL}/api/todos?id=${id}`, {
        method: "DELETE",
      });
      message.success("Todo successfully deleted :)");
    } catch (error) {
      message.error("Failed to todo delete :(");
    }
  };

  return (
    <Popconfirm
      title="Delete this todo"
      description="Are you sure to delete this todo?"
      onConfirm={deleteTodo}
      onCancel={() => message.error("Clicked on cancel button")}
    >
      <Button danger type="link" className="flex items-center justify-center">
        <DeleteOutlined />
      </Button>
    </Popconfirm>
  );
};

export default DeleteTodo;
