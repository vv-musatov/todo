import React from "react";

const ToDoItem = ({ todo, delete_todo }) => {
    return (
        <tr>
            <td>
                {todo.project}
            </td>
            <td>
                {todo.text}
            </td>
            <td>
                {todo.created_at}
            </td>
            <td>
                {todo.author}
            </td>
            <td>
                <button onClick={() => delete_todo(todo.id)} type="button">
                    Delete
                </button>
            </td>
        </tr>
    )
}


const ToDoList = ({ todos, delete_todo }) => {
    return (
        <table>
            <th>
                Project
            </th>
            <th>
                Text
            </th>
            <th>
                Create
            </th>
            <th>
                Author
            </th>
            <th>
            </th>
            {todos.map((todo) => <ToDoItem todo={todo} delete_todo={delete_todo} />)}
        </table>
    )
}


export default ToDoList