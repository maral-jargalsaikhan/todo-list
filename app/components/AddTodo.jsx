"use client";
import { PlusOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Select, message } from "antd";
import React, { useState } from "react";

const initialState = {
  task: "",
  category: "",
  deadline: "",
};

const categoryOptions = [
  { label: "Health", value: "Health" },
  { label: "Mental", value: "Mental" },
  { label: "Education", value: "Education" },
  { label: "Career", value: "Career" },
  { label: "Other", value: "Other" },
];

const AddTodo = () => {
  const [newTodo, setNewTodo] = useState(initialState);

  const handleAddTodo = async (e) => {
    e.preventDefault();

    if (!newTodo.task || !newTodo.category || !newTodo.deadline) {
      message.error("Please fill out all fields :(");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });

      if (response.ok) {
        console.log("newTodo:", newTodo);
        message.success("To Do successfully added :)");
        setNewTodo(initialState);
      } else {
        message.error("Failed to add a todo :(");
      }
    } catch (error) {
      message.error("An error occurred while adding a todo :(");
    }
    setNewTodo(initialState);
  };

  return (
    <Form
      layout="inline"
      className="max-w-[800px] w-full shadow-md rounded-lg p-5 bg-white"
    >
      <Form.Item label="Todo" name="todo">
        <Input
          placeholder="Enter todo"
          value={newTodo.task}
          onChange={(e) => setNewTodo({ ...newTodo, task: e.target.value })}
        />
      </Form.Item>

      <Form.Item label="Category" name="category">
        <Select
          value={newTodo.category}
          options={categoryOptions}
          placeholder="Select category"
          onChange={(e) => setNewTodo({ ...newTodo, category: e })}
          style={{ width: 150 }}
        />
      </Form.Item>

      <Form.Item label="Deadline" name="deadline">
        <DatePicker
          value={newTodo.deadline}
          onChange={(date, dateString) => {
            setNewTodo({ ...newTodo, deadline: dateString });
          }}
        />
      </Form.Item>

      <Button
        type="default"
        onClick={handleAddTodo}
        className="flex items-center justify-center"
      >
        <PlusOutlined />
      </Button>
    </Form>
  );
};

export default AddTodo;
