import { useState } from "react";
import "./styles.css";

import { InputTodo } from "./components/InputTodo.jsx";
import { IncompleteTodo } from "./components/IncompleteTodo.jsx";
import { CompleteTodo } from "./components/CompleteTodo.jsx";

export const App = () => {
  const [todoText, setTodoText] = useState();
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);

  /*テキスト変更*/
  const onChangeTodoText = (event) => setTodoText(event.target.value);

  //追加ボタン機能
  const onClickAdd = () => {
    if (todoText === "") return;
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    setTodoText("");
  };

  //削除ボタン機能
  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    //配列.splite(何番目の要素, いくつ)　削除する関数
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos);
  };

  //完了ボタン機能
  const onClickComplete = (index) => {
    //押された行を削除
    const newIncompleteTodos = [...incompleteTodos];
    //配列.splite(何番目の要素, いくつ)　削除する関数
    newIncompleteTodos.splice(index, 1);
    //押された行の中身をcompleteTodosに結合
    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };

  const onClickBack = (index) => {
    /*押された行を削除*/
    const newCompleteTodos = [...completeTodos];
    //配列.splite(何番目の要素, いくつ)　削除する関数
    newCompleteTodos.splice(index, 1);
    /*押された行の中身をincompleteTodosに結合*/
    const newInCompleteTodos = [...incompleteTodos, completeTodos[index]];
    setIncompleteTodos(newInCompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };

  /*ここからHTML*/
  return (
    <>
      <InputTodo
        todoText={todoText}
        onChangeTodoText={onChangeTodoText}
        onClickAdd={onClickAdd}
        disabled={incompleteTodos.length >= 5}
      />
      {incompleteTodos.length >= 5 && (
        <p style={{ color: "red" }}>
          タスクが多すぎます。Todoを消化してください
        </p>
      )}
      <IncompleteTodo
        todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
      <CompleteTodo todos={completeTodos} onClickBack={onClickBack} />
    </>
  );
};
