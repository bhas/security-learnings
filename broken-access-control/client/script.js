const users = [{ username: "admin", password: "password" }];
const blogPosts = [
  { id: 1, title: "First Post", content: "<script>alert('XSS vulnerability!')</script> Welcome to the blog." },
  { id: 2, title: "Second Post", content: "This is another post. Still vulnerable." }
];

function renderLogin() {
  document.getElementById('app').innerHTML = `
        <div class="container">
          <h2>Login</h2>
          <input type="text" id="username" placeholder="Username" />
          <input type="password" id="password" placeholder="Password" />
          <p class="error" id="error"></p>
          <button onclick="handleLogin()">Login</button>
        </div>
      `;
}

function handleLogin() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    localStorage.setItem('user', username);
    renderBlog();
  } else {
    document.getElementById('error').innerText = 'Invalid credentials';
  }
}

function renderBlog() {
  if (!localStorage.getItem('user')) {
    renderLogin();
    return;
  }

  let postsHTML = blogPosts.map(post => `
        <div class="post">
          <h3>${post.title}</h3>
          <div>${post.content}</div>
        </div>
      `).join('');

  document.getElementById('app').innerHTML = `
        <div class="container">
          <h2>Blog Overview</h2>
          ${postsHTML}
        </div>
      `;
}

if (localStorage.getItem('user')) {
  renderBlog();
} else {
  renderLogin();
}