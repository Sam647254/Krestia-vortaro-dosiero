import { createConnection, ProposedFeatures, InitializeResult, TextDocumentSyncKind } from "vscode-languageserver";

const connection = createConnection(ProposedFeatures.all);

connection.onInitialize((params) => {
   return {
      capabilities: {
         textDocumentSync: TextDocumentSyncKind.Incremental
      }
   };
});

connection.onInitialized(_params => {
   console.log("Server started");
});

connection.onDidChangeTextDocument(change => {
   console.log(change.contentChanges);
});

connection.listen();