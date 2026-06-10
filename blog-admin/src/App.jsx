import { useState } from "react";

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);

  // CREATE
  const addPost = () => {
    if (!title.trim() || !content.trim()) {
      alert("Preencha todos os campos!");
      return;
    }

    const newPost = {
      id: Date.now(),
      title,
      content,
    };

    setPosts([newPost, ...posts]);

    setTitle("");
    setContent("");
  };

  // DELETE
  const deletePost = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  // EDITAR
  const editPost = (post) => {
    setTitle(post.title);
    setContent(post.content);
    setEditingId(post.id);
  };

  // UPDATE
  const updatePost = () => {
    if (!title.trim() || !content.trim()) {
      alert("Preencha todos os campos!");
      return;
    }

    setPosts(
      posts.map((post) =>
        post.id === editingId
          ? {
              ...post,
              title,
              content,
            }
          : post
      )
    );

    setTitle("");
    setContent("");
    setEditingId(null);
  };

  // CANCELAR EDIÇÃO
  const cancelEdit = () => {
    setTitle("");
    setContent("");
    setEditingId(null);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "20px auto" }}>
      <h1>Painel Administrativo do Blog</h1>

      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
        }}
      />

      <textarea
        placeholder="Conteúdo"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows="5"
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
        }}
      />

      <button
        onClick={editingId ? updatePost : addPost}
        style={{ marginRight: "10px" }}
      >
        {editingId ? "Salvar Alterações" : "Publicar"}
      </button>

      {editingId && (
        <button onClick={cancelEdit}>
          Cancelar
        </button>
      )}

      <hr />

      {posts.length === 0 ? (
        <p>Nenhuma postagem encontrada.</p>
      ) : (
        posts.map((post) => (
          <div
            key={post.id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "10px",
            }}
          >
            <h3>{post.title}</h3>

            <p>{post.content}</p>

            <button
              onClick={() => editPost(post)}
              style={{ marginRight: "10px" }}
            >
              Editar
            </button>

            <button
              onClick={() => deletePost(post.id)}
            >
              Excluir
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default App;