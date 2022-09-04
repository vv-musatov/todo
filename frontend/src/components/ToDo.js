import React from "react";

const ToDoItem = ({ todo }) => {
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
        </tr>
    )
}


const ToDoList = ({ todos }) => {
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
            {todos.map((todo) => <ToDoItem todo={todo} />)}
        </table>
    )
}


export default ToDoList