import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export async function loginUser(username, password) {
    const response = await axios.post(`${API_BASE}/login`, { username, password });
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    return response.status === 200;
}

export async function getPosts() {
    const response = await axios.get(`${API_BASE}/posts`);
    return response.data;
}

export async function getPost(postId) {
    const response = await axios.get(`${API_BASE}/posts/${postId}`);
    return response.data;
}

export async function createPost(title, content, owner) {
    const response = await axios.post(`${API_BASE}/posts`, { title, content, owner });
    return response.status === 200 || response.status === 201;
}

export async function postComment(postId, text, owner) {
    const response = await axios.post(`${API_BASE}/posts/${postId}/comments`, { text, owner });
    return response.status === 200 || response.status === 201;
}

export async function deleteComment(postId, commentId) {
    const response = await axios.delete(`${API_BASE}/posts/${postId}/comments/${commentId}`);
    return response.status === 200 || response.status === 204;
}
