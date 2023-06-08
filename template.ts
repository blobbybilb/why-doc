export default `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Test API Docs</title>
  </head>
  <body class="container">
    <h1>Test API Docs</h1>
    <% Object.keys(it).forEach(function(path) { %>
    <article>
      <h3><kbd><%= it[path]["method"] %></kbd> <code><%= path %></code></h3>
      <details>
        <summary><b>Details</b></summary>
        <p><%= it[path]["doctext"] %></p>
        <% if (!(Object.keys(it[path]["getParams"]).length === 0)) { %>
        <h4>GET Parameters</h4>
        <% Object.keys(it[path]["getParams"]).forEach(function(prop) { %>
        <p>
          <code><%= prop %></code>
          <span><%= it[path]["getParams"][prop] %></span>
        </p>
        <% }) %> <% } %> <% if (!(Object.keys(it[path]["postParams"]).length ===
        0)) { %>
        <h4>POST Parameters</h4>
        <% Object.keys(it[path]["postParams"]).forEach(function(prop) { %>
        <p>
          <code><%= prop %></code>
          <span><%= it[path]["postParams"][prop] %></span>
        </p>
        <% }) %> <% } %>
      </details>
    </article>
    <% }) %>
  </body>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/@picocss/pico@1/css/pico.min.css"
  />
  <style>
    h1 {
      text-align: center;
      margin-top: 50px;
    }
  </style>
</html>
`