import { useState, useEffect } from 'react';
import { getPosts, createPost, postComment } from '../api';

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).replace(',', '');
}

export default function PostOverviewPage({ user }) {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [commentText, setCommentText] = useState({});

  useEffect(() => {
    getPosts().then(setPosts);
  }, []);

  const handleAddPost = async (e) => {
    e.preventDefault();
    if (!newPost.title || !newPost.content) return;
    await createPost(newPost.title, newPost.content, user);
    setNewPost({ title: '', content: '' });
    setPosts(await getPosts());
  };

  const handleAddComment = async (postId) => {
    if (!commentText[postId]) return;
    await postComment(postId, commentText[postId], user);
    setCommentText({ ...commentText, [postId]: '' });
    setPosts(await getPosts());
  };

  return (
    <div className="post-overview-page main-container">
      <h2>Posts</h2>
      <form onSubmit={handleAddPost}>
        <input
          type="text"
          placeholder="Title"
          value={newPost.title}
          onChange={e => setNewPost({ ...newPost, title: e.target.value })}
        />
        <textarea
          placeholder="Content"
          value={newPost.content}
          onChange={e => setNewPost({ ...newPost, content: e.target.value })}
        />
        <button type="submit">Add Post</button>
      </form>
      <div style={{marginTop: 50}}>
        {posts.length === 0 && <p>No posts yet.</p>}
        {posts.map(post => (
          <div className="card" key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <div style={{fontSize:'0.9em',color:'#888'}}>By {post.owner} on {formatDate(post.date)}</div>
            <div style={{marginTop: 20}}>
              <strong>Comments:</strong>
              {post.comments && post.comments.length > 0 ? (
                post.comments.map(comment => (
                  <div className="comment" key={comment.id}>
                    {comment.text} <span style={{fontSize:'0.85em',color:'#666'}}>by {comment.owner} on {formatDate(comment.date)}</span>
                  </div>
                ))
              ) : (
                <div style={{color:'#aaa'}}>No comments yet.</div>
              )}
              <div style={{marginTop:8}}>
                <input
                  type="text"
                  placeholder="Add a comment"
                  value={commentText[post.id] || ''}
                  onChange={e => setCommentText({ ...commentText, [post.id]: e.target.value })}
                  style={{width:'70%'}}
                />
                <button type="button" onClick={() => handleAddComment(post.id)} style={{marginLeft:8}}>Comment</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
