"use client";
import React, { useState } from "react";
import { Empty, Table, Tag } from "antd";
import UpdateTodo from "./UpdateTodo";
import DeleteTodo from "./DeleteTodo";

const categoryTags = [
  { category: "Health", color: "success" },
  { category: "Mental", color: "purple" },
  { category: "Education", color: "processing" },
  { category: "Career", color: "error" },
  { category: "Other", color: "warning" },
];

const TodoList = ({ todos }) => {
  function renderAction(selectedTodo) {
    if (!selectedTodo) {
      return null;
    }

    return (
      <div className="flex">
        <UpdateTodo selectedTodo={selectedTodo} />
        <DeleteTodo id={selectedTodo._id} />
      </div>
    );
  }

  const columns = [
    { title: "Todo", dataIndex: "todo", key: "todo" },
    { title: "Deadline", dataIndex: "deadline", key: "deadline" },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category) => (
        <Tag
          bordered={false}
          color={
            categoryTags.find((tag) => tag.category === category)?.color ||
            "default"
          }
        >
          {category}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (record) => renderAction(record),
    },
  ];

  return (
    <div className="w-full mt-3 shadow-md rounded-lg">
      {todos && todos.length > 0 ? (
        <Table
          columns={columns}
          dataSource={todos}
          pagination={false}
          rowKey={(record) => record.id}
          rowSelection={{ type: "checkbox" }}
        />
      ) : (
        <Empty />
      )}
    </div>
  );
};

export default TodoList;
