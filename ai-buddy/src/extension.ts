import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

let panel: vscode.WebviewPanel | undefined;
let chatHistory: { role: 'user' | 'ai'; content: string }[] = [];
function resetChat() {
	chatHistory = [];
	renderPanel();
}
function getWebviewHtml(
	context: vscode.ExtensionContext,
	webview: vscode.Webview
): string {

	const htmlPath = path.join(context.extensionPath, 'media', 'panel.html');
	let html = fs.readFileSync(htmlPath, 'utf8');

	const styleUri = webview.asWebviewUri(
		vscode.Uri.joinPath(context.extensionUri, 'media', 'panel.css')
	);

	const scriptUri = webview.asWebviewUri(
		vscode.Uri.joinPath(context.extensionUri, 'media', 'panel.js')
	);

	html = html.replace('{{styleUri}}', styleUri.toString());
	html = html.replace('{{scriptUri}}', scriptUri.toString());

	return html;
}

export function activate(context: vscode.ExtensionContext) {

	const disposable = vscode.commands.registerCommand(
		'ai-buddy.helloWorld',
		async () => {

			const editor = vscode.window.activeTextEditor;
			if (!editor) {
				return;
			};

			const selection = editor.selection;
			const selectedText = editor.document.getText(selection);
			if (!selectedText) {
				return;
			};

			const action = await vscode.window.showQuickPick(
				['Explain this code', 'Find bugs in this code', 'Optimize this code'],
				{ placeHolder: 'What do you want AI Buddy to do?' }
			);

			if (!action) {
				return;
			};
			resetChat();
			createOrShowPanel(context);

			addMessage('user', `**Task:** ${action}\n\n\`\`\`js\n${selectedText}\n\`\`\``);
			await callBackend(action, selectedText);
		}
	);

	context.subscriptions.push(disposable);
}

async function callBackend(action: string, code: string) {
	try {
		const response = await fetch('http://localhost:5000/ai', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ action, code })
		});

		const data = (await response.json()) as { message?: string };

		addMessage(
			'ai',
			data.message ?? '⚠️ No response from AI'
		);

	} catch {
		addMessage('ai', '❌ Backend not reachable');
	}
}

function createOrShowPanel(context: vscode.ExtensionContext) {
	if (panel) {
		panel.reveal(vscode.ViewColumn.Beside);
		return;
	}

	panel = vscode.window.createWebviewPanel(
		'aiBuddyChat',
		'AI Buddy',
		vscode.ViewColumn.Beside,
		{ enableScripts: true }
	);

	panel.webview.html = getWebviewHtml(context, panel.webview);

	panel.webview.onDidReceiveMessage(async message => {
		if (message.type === 'followup') {
			addMessage('user', message.text);
			await callBackend('Follow-up question', message.text);
		}
	});

	panel.onDidDispose(() => {
		panel = undefined;
		chatHistory = [];
	});

	renderPanel();
}

function addMessage(role: 'user' | 'ai', markdown: string) {
	chatHistory.push({ role, content: markdown });
	renderPanel();
}

async function renderPanel() {
	if (!panel) {
		return;
	}

	const { marked } = await import('marked');

	const chatHtml = chatHistory.map(msg => {
		const content = marked.parse(msg.content);
		return msg.role === 'user'
			? `<div class="user">${content}</div>`
			: `<div class="ai">${content}</div>`;
	}).join('');

	panel.webview.postMessage({ chat: chatHtml });
}

export function deactivate() { }
