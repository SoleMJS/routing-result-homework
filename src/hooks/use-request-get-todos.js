import { useEffect, useState } from 'react'

export const useRequestGetTodos = refreshTodosFlag => {
	const [todos, setTodos] = useState([])
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		setIsLoading(true)
		fetch('http://localhost:3005/todos')
			.then(response => response.json())
			.then(json => setTodos(json))
			.finally(() => setIsLoading(false))
	}, [refreshTodosFlag])

	return {
		isLoading,
		todos,
	}
}
