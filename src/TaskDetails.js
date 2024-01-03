import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useRequestGetTodo } from './hooks'

const TaskDetails = () => {
	const navigate = useNavigate()
	const { id } = useParams()
	const { isLoading, todos } = useRequestGetTodo(id)
	const handleGoBack = () => {
		navigate(-1)
	}

	if (isLoading) {
		return <div className='loader'></div>
	}

	if (!todos) {
		return (
			<div>
				<h1>404 - Not Found</h1>
				<p>Задача не найдена</p>
				<button className='btn btn-primary' onClick={handleGoBack}>
					Назад
				</button>
			</div>
		)
	}

	return (
		<div>
			<h1>Task Details</h1>
			<p>ID: {todos.id}</p>
			<p>Title: {todos.title}</p>
			<p>Completed: {todos.completed ? 'Да' : 'Нет'}</p>
			<button className='btn btn-primary' onClick={handleGoBack}>
				Назад
			</button>
		</div>
	)
}

export default TaskDetails
