const isLocalEnvironment = ["localhost", "127.0.0.1"].includes(
  window.location.hostname,
);

// Configuracao central da origem dos dados.
// Em ambiente local, a aplicacao usa o json-server.
// No GitHub Pages, usa um seed em server.json e persiste os dados no localStorage.
export const apiConfig = {
  baseUrl: "http://localhost:3333",
  usesStaticStorage: !isLocalEnvironment,
  staticDataUrl: new URL("server.json", window.location.href).toString(),
};

