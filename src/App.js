// App.js
import React, { useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import './App.css'
import NotFound from './NotFound'
import TaskDetails from './TaskDetails'
import {
	useRequestAddTodo,
	useRequestDeleteTodo,
	useRequestGetTodos,
	useRequestUpdateTodo,
} from './hooks'

export const App = () => {
	const [refreshTodosFlag, setRefreshTodosFlag] = useState(false)

	const refreshTodos = () => setRefreshTodosFlag(!refreshTodosFlag)

	const { isLoading, todos } = useRequestGetTodos(refreshTodosFlag)
	const { isCreating, requestAddTodo } = useRequestAddTodo(refreshTodos)
	const { isUpdating, requestUpdateTodo } = useRequestUpdateTodo(refreshTodos)
	const { isDeleting, requestDeleteTodo } = useRequestDeleteTodo(refreshTodos)

	return (
		<div className='container mt-4'>
			<h1>Todo List</h1>
			{isLoading ? (
				<div className='loader'></div>
			) : (
				<>
					<Routes>
						<Route
							path='/'
							element={
								<>
									<ul className='list-group'>
										{todos.map(({ id, title }) => (
											<Link
												key={id}
												className='list-group-item'
												to={`/task/${id}`}
											>
												{title.length > 30 ? `${title.slice(0, 30)}...` : title}
											</Link>
										))}
									</ul>

									<button
										disabled={isCreating}
										className='btn btn-primary m-2'
										onClick={requestAddTodo}
									>
										Добавить задачу
									</button>
									<button
										className='btn btn-primary m-2'
										disabled={isUpdating}
										onClick={requestUpdateTodo}
									>
										Обновить задачу
									</button>
									<button
										className='btn btn-danger m-2'
										disabled={isDeleting}
										onClick={requestDeleteTodo}
									>
										Удалить задачу
									</button>
								</>
							}
						/>
						<Route path='/task/:id' element={<TaskDetails />} />
						<Route path='*' element={<NotFound />} />
					</Routes>
				</>
			)}
		</div>
	)
}

export default App
