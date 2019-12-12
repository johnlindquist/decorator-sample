import * as vscode from 'vscode';

// this method is called when vs code is activated
export function activate(context: vscode.ExtensionContext) {
	console.log('decorator sample is activated');

	let timeout: NodeJS.Timer | undefined = undefined;

	// create a decorator type that we use to decorate small numbers
	const smallNumberDecorationType = vscode.window.createTextEditorDecorationType({
		color: 'rgba(0, 0, 0, 0)',
		before: {
			contentText: '🙈'
		},
		after: {
			contentText: '🙈'
		}
	});

	let activeEditor = vscode.window.activeTextEditor;

	function updateDecorations() {
		if (!activeEditor) {
			return;
		}
		const regEx = /\d+/g;
		const text = activeEditor.document.getText();
		const tokenValueTexts: vscode.DecorationOptions[] = [];
		let match;
		while ((match = regEx.exec(text))) {
			const startPos = activeEditor.document.positionAt(match.index);
			const endPos = activeEditor.document.positionAt(match.index + match[0].length);
			const decoration = {
				range: new vscode.Range(startPos, endPos),
				hoverMessage: 'Number **' + match[0] + '**'
			};
			tokenValueTexts.push(decoration);
		}
		activeEditor.setDecorations(smallNumberDecorationType, tokenValueTexts);
	}

	function triggerUpdateDecorations() {
		//hello
		// if (timeout) {
		// 	clearTimeout(timeout);
		// 	timeout = undefined;
		// }
		// timeout = setTimeout(updateDecorations, 500);
		updateDecorations();
	}

	if (activeEditor) {
		triggerUpdateDecorations();
	}

	vscode.window.onDidChangeActiveTextEditor(
		editor => {
			activeEditor = editor;
			if (editor) {
				triggerUpdateDecorations();
			}
		},
		null,
		context.subscriptions
	);

	vscode.workspace.onDidChangeTextDocument(
		event => {
			if (activeEditor && event.document === activeEditor.document) {
				triggerUpdateDecorations();
			}
		},
		null,
		context.subscriptions
	);
}
