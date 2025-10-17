import api from ".";

export const getToDo = async (params = {}) => {
  const { data } = await api.get("/todos", { params });
  return data;
};

export const getTodoDetail = async (id) => {
  const { data } = await api.get(`/todos/${id}`);
  return data;
};

export const createTodo = async (body) => {
  const { data } = await api.post("/todos", body);
  return data;
};

export const updateTodo = async (id, body) => {
  const { data } = await api.put(`/todos/${id}`, body);
  return data;
};

export const deleteTodo = async (id) => {
  const { data } = await api.delete(`/todos/${id}`);
  return data;
};
