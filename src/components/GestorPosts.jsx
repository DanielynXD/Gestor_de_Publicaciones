import { useState } from "react";
import usePosts from "../hooks/usePosts";

function GestorPosts() {
  const { posts, cargando, error, agregarPost, eliminarPost } = usePosts();

  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const postsFiltrados = posts.filter((post) =>
    post.title.toLowerCase().includes(busqueda.toLowerCase()),
  );

  async function manejarEnvio(evento) {
    evento.preventDefault();

    if (titulo.trim() === "" || contenido.trim() === "") {
      alert("Debe completar el título y el contenido.");
      return;
    }

    await agregarPost(titulo, contenido);

    setTitulo("");
    setContenido("");
  }

  if (cargando) {
    return (
      <section className="card">
        <p>Cargando publicaciones...</p>
      </section>
    );
  }

  return (
    <section className="card">
      <h2>Gestor de publicaciones</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={manejarEnvio} className="formulario">
        <label htmlFor="titulo">Título:</label>
        <input
          id="titulo"
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Ingrese el título"
        />

        <label htmlFor="contenido">Contenido:</label>
        <textarea
          id="contenido"
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
          placeholder="Ingrese el contenido"
          rows="4"
        />

        <button type="submit">Crear publicación</button>
      </form>

      <hr />

      <h3>Publicaciones registradas</h3>
      <p>Total de publicaciones: {posts.length}</p>

    <h3>Buscar publicaciones</h3>
      <input
        type="text"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder="Buscar por título"
      />


      {posts.length === 0 ? (
        <p>No existen publicaciones.</p>
      ) : (
        <div className="lista-posts">
          {postsFiltrados.map((post) => (
            <article className="post" key={post.id}>
              <h4>{post.title}</h4>
              <p>{post.body}</p>

              <button
                className="btn-eliminar"
                onClick={() => eliminarPost(post.id)}
              >
                Eliminar
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default GestorPosts;
