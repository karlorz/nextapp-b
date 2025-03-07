import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTodos } from '../hooks/useTodos';
import type { Todo } from '../hooks/useTodos'; // Import Todo interface

type TodoForm = {
  title: string;
  description?: string;
};

export function TodoList({ userId }: { userId: string }) {
  const { todos, isLoading, addTodo, updateTodo, deleteTodo, subscribeToChanges } = useTodos(userId);
  const { register, handleSubmit, reset } = useForm<TodoForm>();

  useEffect(() => {
    const unsubscribe = subscribeToChanges();
    return () => unsubscribe();
  }, [subscribeToChanges]);

  const onSubmit = async (todoForm: TodoForm) => { // Type parameter as TodoForm
    await addTodo.mutateAsync({
      title: todoForm.title, // Use todoForm.title
      description: todoForm.description || null, // Use todoForm.description
    });
    reset();
  };

  const toggleComplete = (todo: Todo) => { // Type todo parameter as Todo
    updateTodo.mutate({
      id: todo.id,
      completed: !todo.completed,
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="mb-8">
        <div className="flex gap-4">
          <input
            {...register('title', { required: true })}
            placeholder="Add a new todo..."
            className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add
          </button>
        </div>
        <textarea
          {...register('description')}
          placeholder="Description (optional)"
          className="mt-2 w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </form>

      <div className="space-y-4">
        {todos?.map((todo: Todo) => ( // Type todo parameter in map function as Todo
          <div
            key={todo.id}
            className="flex items-start gap-4 p-4 border rounded bg-white shadow-sm"
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo)}
              className="mt-1"
            />
            <div className="flex-1">
              <h3 className={`font-medium ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                {todo.title}
              </h3>
              {todo.description !== null && todo.description !== undefined && ( // Check for null and undefined
                <p className={`mt-1 text-sm ${todo.completed ? 'text-gray-400' : 'text-gray-600'}`}>
                  {todo.description}
                </p>
              )}
            </div>
            <button
              onClick={() => deleteTodo.mutate(todo.id)}
              type="button"
              className="text-red-500 hover:text-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
