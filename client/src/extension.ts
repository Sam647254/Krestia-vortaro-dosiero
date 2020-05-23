import * as vscode from 'vscode';
import * as path from 'path';

import { ServerOptions, TransportKind, LanguageClientOptions, LanguageClient } from 'vscode-languageclient';

let client: LanguageClient;

export function activate(context: vscode.ExtensionContext) {
	const servilo = context.asAbsolutePath(path.join("server", "out", "server.js"));
	const debugAgordoj = { execArgv: ['--nolazy', '--inspect=6009'] };
	const serviloAgordoj: ServerOptions = {
		run: {
			module: servilo,
			transport: TransportKind.ipc
		},
		debug: {
			module: servilo,
			transport: TransportKind.ipc,
			options: debugAgordoj
		},
	};
	const clientAgordoj: LanguageClientOptions = {
		documentSelector: [{ scheme: 'file', language: 'krestia-vortaro'}],
		synchronize: {
			fileEvents: vscode.workspace.createFileSystemWatcher('**/clientrc')
		}
	};

	client = new LanguageClient(
		'Krestia dictionary',
		serviloAgordoj,
		clientAgordoj
	);

	client.start();
}

// this method is called when your extension is deactivated
export function deactivate() {
	client?.stop();
}
