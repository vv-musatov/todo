import React from "react";

const ToDoUserItem = ({ todoUser }) => {
    return (
        <tr>
            <td>
                {todoUser.username}
            </td>
            <td>
                {todoUser.first_name}
            </td>
            <td>
                {todoUser.last_name}
            </td>
            <td>
                {todoUser.email}
            </td>
        </tr>
    )
}


const ToDoUserList = ({ todoUsers }) => {
    return (
        <table>
            <th>
                Username
            </th>
            <th>
                First name
            </th>
            <th>
                Last name
            </th>
            <th>
                Email
            </th>
            {todoUsers.map((todoUser) => <ToDoUserItem todoUser={todoUser} />)}
        </table>
    )
}


export default ToDoUserList