const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  // Define que o bundle será gerado para execução no navegador
  target: "web",
  // Mantém a configuração voltada para desenvolvimento e depuração local
  mode: "development",

  // Arquivo de entrada principal da aplicação
  entry: path.resolve(__dirname, "src", "main.js"),
  output: {
    // Nome do arquivo JavaScript final gerado pelo Webpack
    filename: "main.js",
    // Pasta de saída onde o bundle será salvo
    path: path.resolve(__dirname, "dist"),
  },

  // Configuração do servidor local usado durante o desenvolvimento
  devServer: {
    static: {
      // Serve os arquivos gerados dentro da pasta dist
      directory: path.resolve(__dirname, "dist"),
    },
    // Porta usada para abrir a aplicação no navegador
    port: 3000,
    // Abre o navegador automaticamente ao iniciar o servidor
    open: true,
    // Atualiza a página quando houver mudanças nos arquivos monitorados
    liveReload: true,
  },

  plugins: [
    // Gera o arquivo HTML a partir do template
    new HtmlWebpackPlugin({
      // O caminho para o template HTML deve ser relativo ao diretório do projeto
      template: path.resolve(__dirname, "index.html"),
      // O caminho para o favicon também deve ser relativo ao diretório do projeto
      favicon: path.resolve(__dirname, "src", "assets", "scissors.svg"),
    }),
    // Copia os arquivos estáticos da pasta assets para a saída final
    new CopyWebpackPlugin({
      // Os padrões definem quais arquivos e pastas serão copiados no build
      patterns: [
        {
          // O caminho de origem deve ser relativo ao diretório do projeto
          from: path.resolve(__dirname, "src", "assets"),
          // O caminho de destino deve ser relativo ao diretório de saída
          to: path.resolve(__dirname, "dist", "src", "assets"),
        },
      ],
    }),
  ],

  // Configuração para processar arquivos CSS e JavaScript
  module: {
    rules: [
      {
        // Lê os arquivos CSS e injeta os estilos na aplicação
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },

      {
        // Transpila os arquivos JavaScript para melhorar a compatibilidade
        test: /\.js$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      }
    ],
  },
};
