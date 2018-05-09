const { Asset } = require('parcel-bundler');
const fs = require('fs');
const ts = require('typescript');
const prettier = require('prettier');

class AstAsset extends Asset {
  constructor(name, pkg, options) {
    super(name, pkg, options);
    this.type = 'js';
  }

  parse(content) {
    this.code = '{}';
    const codeParts = {};

    function registerCode(key, content) {
      if (codeParts[key]) {
        throw new Error(`Code key should be uniq, found ${key} twice`);
      }
      codeParts[key] = content;
    }

    function findCode(sourceFile) {
      traverse(sourceFile);

      function traverse(node) {
        if (node.kind === ts.SyntaxKind.CallExpression) {
          if (node.expression && (node.expression.escapedText === 'code' || node.expression.escapedText === 'codeParams')) {
            const keyNode = node.arguments[1];
            if (keyNode.kind !== ts.SyntaxKind.StringLiteral) {
              throw new Error('Code identifier must be string literal');
            }
            const key = keyNode.text;
            const cb = node.arguments[2];
            if (cb.kind !== ts.SyntaxKind.ArrowFunction) {
              throw new Error('Code callback should be an ArrowFunction');
            }
            const body = cb.body;
            let content = '';
            if (body.kind === ts.SyntaxKind.Block) {
              content = body.statements.map(s => s.getText()).join('\n\n');
            } else {
              content = body.getText();
            }
            const formattedContent = prettier.format(content, { filepath: 'file.tsx', printWidth: 50 }).replace(/[\n]+$/g, '');

              // .split('\n')
              // .slice(0, -1)
              // .join('\n');
            registerCode(key, formattedContent);
          }
        }
        ts.forEachChild(node, traverse);
      }
    }

    const ast = ts.createSourceFile('file.tsx', content, ts.ScriptTarget.ES2015, /*setParentNodes */ true);
    findCode(ast);

    this.code = JSON.stringify(codeParts);
  }
  generate() {
    // Send to JS bundler
    return { js: `module.exports = JSON.parse(${this.code ? JSON.stringify(this.code) : '"{}"'});` };
  }
}

module.exports = AstAsset;
