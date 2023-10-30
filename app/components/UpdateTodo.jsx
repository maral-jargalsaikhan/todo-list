import { EditOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Modal, Select, message } from "antd";
import { Input } from "antd";
import { useState } from "react";

const categoryOptions = [
  { label: "Health", value: "Health" },
  { label: "Mental", value: "Mental" },
  { label: "Education", value: "Education" },
  { label: "Career", value: "Career" },
  { label: "Other", value: "Other" },
];

const UpdateTodo = ({ selectedTodo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState({ selectedTodo });

  const cancelHandler = () => {
    setIsModalOpen(false);
  };

  const updateHandler = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/todos/${selectedTodo._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTodo),
        }
      );
      message.success("Todo updated");
      setIsModalOpen(false);
    } catch (error) {
      message.error("Failed to update");
    }
  };

  const loadTodo = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/todos/${selectedTodo._id}`,
        {
          cache: "no-store",
        }
      );
      const data = await res.json();
      setUpdatedTodo(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button
        type="link"
        onClick={() => {
          setIsModalOpen(true);
          loadTodo();
        }}
      >
        <EditOutlined />
      </Button>

      <Modal
        title="Edit todo"
        open={isModalOpen}
        onOk={updateHandler}
        onCancel={cancelHandler}
      >
        <Form initialValues={updatedTodo}>
          <Form.Item label="Todo" name="todo">
            <Input
              placeholder={selectedTodo.todo}
              onChange={(e) =>
                setUpdatedTodo({ ...selectedTodo, todo: e.target.value })
              }
            />
          </Form.Item>

          <Form.Item label="Category" name="category">
            <Select
              options={categoryOptions}
              placeholder={selectedTodo.category}
              style={{ width: 150 }}
              onChange={(e) => setUpdatedTodo({ ...selectedTodo, category: e })}
            />
          </Form.Item>

          <Form.Item label="Deadline">
            <DatePicker
              placeholder={selectedTodo.deadline}
              onChange={(date, dateString) => {
                setUpdatedTodo({ ...selectedTodo, deadline: dateString });
              }}
            />
          </Form.Item>

          {/* <Button
            type="default"
            className="flex items-center justify-center"
            onClick={updateHandler}
          >
            Save
          </Button> */}
        </Form>
      </Modal>
    </>
  );
};

export default UpdateTodo;
