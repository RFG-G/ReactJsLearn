import React from 'react';
import './App.css';

function TodoForm({addTodo}) {
  const [value, setValue] = React.useState('');

  const handleSubmit = (event) => {
      event.preventDefault();
      if (!value) return;
      addTodo(value);
      setValue('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text"
        value={value}
        placeholder="Введите текст..."
        className="todo-input"
        maxLength='70'
        onChange={({target}) => setValue(target.value)}
      />
    </form>
  )
}

function TodoItem({todo, index, backTodo, deleteTodo, completeTodo}) {
  return (
      <div
        className="todo-item"
        style={{textDecoration: todo?.isCompleted ? "line-through" : ""}}
      >
        {todo?.text}
        <div>
          {!todo?.isCompleted ? 
          <button 
            className="complete-btn"
            onClick={_ => completeTodo(index)}
          >
            Завершить
          </button> : 
          <button 
            className="complete-btn"
            onClick={_ => backTodo(index)}
          >
            Вернуть
          </button>}
          <button
            className="close-btn"
            onClick={_ => deleteTodo(index)}
          >x</button>
        </div>
      </div>
  )
}

function App() {
  const [todos, setTodos] = React.useState([
    {
      text: 'Закончить курс',
      isCompleted: false
    },
    {
      text: 'Начать курс',
      isCompleted: false
    }
  ]);

  const addTodo = (text) => {
    const newTodos = [{text}, ...todos]
    setTodos(newTodos)
  }

  const deleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos)
  }

  const completeTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos)
  }

  const backTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = false;
    setTodos(newTodos)
  }

  return (
    <div className="app">
        <div className="todo-list">
          <h2 className="title">ToDo список</h2>
          <TodoForm addTodo={addTodo} />
          <h2 className="title">Мои задачи</h2>
          {todos?.length > 0 ? todos.map((todo, index) =>
            <TodoItem 
              todo={todo}
              index={index}
              deleteTodo={deleteTodo}
              backTodo={backTodo}
              completeTodo={completeTodo}
            />
          ) : <h2>Добавьте задачи...</h2>}
        </div>
    </div>
  );
}

export default App;
