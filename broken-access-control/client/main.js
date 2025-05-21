// main.js
let currentUser = null;

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('login-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        await login();
    });

    document.getElementById('post-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        await createPostHandler();
    });
});

async function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    const success = await loginUser(username, password);
    if (success) {
        currentUser = username;
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('post-form').style.display = 'block';
        loadPosts();
    } else {
        alert('Login failed');
    }
}

async function loadPosts() {
    const postsContainer = document.getElementById('posts');
    postsContainer.innerHTML = '<h2>Posts</h2>';
    const posts = await getPosts();
    posts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.className = 'post';
        postDiv.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <p><em>By ${post.owner || 'Unknown'} on ${new Date(post.date).toLocaleString()}</em></p>
        `;

        const commentSection = document.createElement('div');
        commentSection.className = 'comment-section';

        if (post.comments && post.comments.length > 0) {
            post.comments.forEach(comment => {
                const commentDiv = document.createElement('div');
                commentDiv.className = 'comment';
                commentDiv.innerHTML = `
                    <p>${comment.text}</p>
                    <small><em>${comment.owner || 'Anonymous'} on ${new Date(comment.date).toLocaleString()}</em></small>
                `;
                commentSection.appendChild(commentDiv);
            });
        }

        if (currentUser) {
            const commentForm = document.createElement('div');
            commentForm.className = 'comment-form';
            const textarea = document.createElement('textarea');
            textarea.placeholder = 'Add a comment...';
            const button = document.createElement('button');
            button.textContent = 'Comment';
            button.onclick = () => submitComment(post.id, textarea.value);
            commentForm.appendChild(textarea);
            commentForm.appendChild(button);
            commentSection.appendChild(commentForm);
        }

        postDiv.appendChild(commentSection);
        postsContainer.appendChild(postDiv);
    });
}

async function createPostHandler() {
    const title = document.getElementById('post-title').value;
    const content = document.getElementById('post-content').value;
    const success = await createPost(title, content, currentUser);
    if (success) {
        document.getElementById('post-title').value = '';
        document.getElementById('post-content').value = '';
        loadPosts();
    } else {
        alert('Failed to create post');
    }
}

async function submitComment(postId, text) {
    if (!text.trim()) {
        alert('Comment cannot be empty');
        return;
    }
    const success = await postComment(postId, text, currentUser);
    if (success) {
        loadPosts();
    } else {
        alert('Failed to post comment');
    }
}
