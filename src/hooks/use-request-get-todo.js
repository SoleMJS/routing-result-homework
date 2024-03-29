import { useEffect, useState } from 'react'

export const useRequestGetTodo = id => {
	const [todos, setTodos] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	useEffect(() => {
		setIsLoading(true)
		fetch(`http://localhost:3005/todos/${id}`)
			.then(response => response.json())
			.then(json => setTodos(json))
			.finally(() => setIsLoading(false))
	}, [id])
	return {
		isLoading,
		todos,
	}
}
