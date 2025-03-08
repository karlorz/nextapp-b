import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";

export interface Todo {
	id: string;
	title: string;
	description: string | null;
	completed: boolean;
	created_at: Date;
	updated_at: Date;
	user_id: string;
}

type NewTodo = Omit<
	Todo,
	"id" | "created_at" | "updated_at" | "completed" | "user_id"
>;

export function useTodos(userId: string) {
	const queryClient = useQueryClient();

	const { data, isLoading } = useQuery({
		queryKey: ["todos", userId],
		queryFn: async () => {
			const { data, error } = await supabase
				.from("todos")
				.select("*")
				.eq("user_id", userId);

			if (error) {
				console.error("Error fetching todos:", error);
				throw error;
			}
			return data.map((todo) => ({
				...todo,
				created_at: new Date(todo.created_at),
				updated_at: new Date(todo.updated_at),
			})) as Todo[];
		},
	});

	const addTodo = useMutation({
		mutationFn: async (todo: NewTodo) => {
			const { data, error } = await supabase
				.from("todos")
				.insert([
					{
						id: crypto.randomUUID(),
						...todo,
						user_id: userId,
						completed: false,
					},
				])
				.select("*")
				.single();

			if (error) {
				console.error("Error adding todo:", error);
				throw error;
			}
			return data as Todo;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["todos", userId] });
		},
	});

	const updateTodo = useMutation({
		mutationFn: async ({ id, ...fields }: Partial<Todo> & { id: string }) => {
			const { data, error } = await supabase
				.from("todos")
				.update(fields)
				.eq("id", id)
				.select("*")
				.single();

			if (error) {
				console.error("Error updating todo:", error);
				throw error;
			}
			return data as Todo;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["todos", userId] });
		},
	});

	const deleteTodo = useMutation({
		mutationFn: async (id: string) => {
			const { error } = await supabase.from("todos").delete().eq("id", id);

			if (error) {
				console.error("Error deleting todo:", error);
				throw error;
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["todos", userId] });
		},
	});

	// Subscribe to real-time updates
	const subscribeToChanges = () => {
		const channel = supabase
			.channel("todos")
			.on(
				"postgres_changes",
				{
					event: "*",
					schema: "public",
					table: "todos",
					filter: `user_id=eq.${userId}`,
				},
				() => {
					queryClient.invalidateQueries({ queryKey: ["todos", userId] });
				},
			)
			.subscribe();

		return () => {
			supabase.removeChannel(channel);
		};
	};

	return {
		todos: data, // Use data here
		isLoading,
		addTodo,
		updateTodo,
		deleteTodo,
		subscribeToChanges,
	};
}
