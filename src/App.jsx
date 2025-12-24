import { useState } from "react";
import "./App.css";

function App() {
  const [todoList, setTodoList] = useState([
  { id: 0, content: "123", done: false },
  { id: 1, content: "코딩 공부하기", done: false },
  { id: 2, content: "잠 자기", done: false },
]);

  return (
    <div className="app">
    <h1>Todo App</h1>
      <TodoList todoList={todoList} setTodoList={setTodoList} />
      <hr />
      <TodoInput todoList={todoList} setTodoList={setTodoList} />

    </div>
  );
}

function TodoInput({ todoList, setTodoList }) {
  const [inputValue, setInputValue] = useState("");
  return (
    <>
    <div className="todo-input">
      <input
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
      <button className="btn input-button"
        onClick={() => {
          const newTodo = { id: Number(new Date()), content: inputValue, done: false };
          const newTodoList = [...todoList, newTodo];
          setTodoList(newTodoList);
          setInputValue("");
        }}
      >
        추가하기
      </button>
      </div>
    </>
  );
}

function TodoList({ todoList, setTodoList }) {
  return (
    <ul>
      {todoList.map((todo) => (
        <Todo key={todo.id} todo={todo} setTodoList={setTodoList} />
      ))}
    </ul>
  );
}

function Todo({ todo, setTodoList }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.content);

  const handleSave = () => {
    setTodoList((prev) =>
      prev.map((el) => (el.id === todo.id ? { ...el, content: editValue } : el))
    );
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(todo.content); // 원래 값으로 되돌리기
    setIsEditing(false);
  };

  return (
    <li>
      {isEditing ? (
        <>
          <input
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
          />
          <button className='btn save-button' onClick={handleSave}>저장</button>
          <button className='btn cancel-button' onClick={handleCancel}>취소</button>
        </>
      ) : (
        <>
  <input
    type="checkbox"
    checked={todo.done}
    onChange={() => {
      setTodoList((prev) =>
        prev.map((el) =>
          el.id === todo.id ? { ...el, done: !el.done } : el
        )
      );
    }}
  />

  <span style={{ textDecoration: todo.done ? "line-through" : "none" }}>
    {todo.content}
  </span>

  <button className='btn change-button' onClick={() => setIsEditing(true)}>수정</button>

  <button className='btn delete-button'
    onClick={() => {
      setTodoList((prev) => prev.filter((el) => el.id !== todo.id));
    }}
  >
    삭제
  </button>
</>
      )}
    </li>
  );
}

export default App;
