import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	const decoration = vscode.window.createTextEditorDecorationType({
		color: 'rgba(0, 0, 0, 0)',
		before: {
			contentText: '🙈'
		},
		after: {
			contentText: '🙈'
		}
	});

	const editor = vscode.window.activeTextEditor;

	if (editor) {
		const start = editor.document.positionAt(0);
		const end = editor.document.positionAt(10);
		editor.setDecorations(decoration, [
			{
				range: new vscode.Range(start, end),
				hoverMessage: 'Hello world!'
			}
		]);
	}
}
