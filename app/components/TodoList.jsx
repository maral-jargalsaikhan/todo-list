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

const statusStyle = [
  { status: "pending", color: "f50" },
  { status: "processing", color: "#2db7f5" },
  { status: "done", color: "#87d068" },
];

const TodoList = ({ todos }) => {
  function renderAction(selectedTodo) {
    if (!selectedTodo) {
      return null;
    }

    return (
      <div className="flex justify-center gap-2">
        <UpdateTodo selectedTodo={selectedTodo} />
        <DeleteTodo id={selectedTodo._id} />
      </div>
    );
  }

  const columns = [
    {
      title: "№",
      dataIndex: "no",
      key: "no",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          bordered={false}
          className="flex justify-center"
          color={statusStyle.find((status) => status.status === status)?.color}
        >
          {status}
        </Tag>
      ),
    },
    { title: "Todo", dataIndex: "todo", key: "todo" },
    { title: "Deadline", dataIndex: "deadline", key: "deadline" },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category) => (
        <Tag
          bordered={false}
          className="flex justify-center"
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
    <div className="w-full shadow-md rounded-lg">
      {todos && todos.length > 0 ? (
        <Table
          columns={columns}
          dataSource={todos}
          pagination={false}
          rowKey={(record) => record.id}
        />
      ) : (
        <Empty />
      )}
    </div>
  );
};

export default TodoList;
