import { extractText, getDocumentProxy } from 'unpdf';
import fs from 'fs';
for (const f of process.argv.slice(2)) {
  const pdf = await getDocumentProxy(new Uint8Array(fs.readFileSync(f)));
  const { text } = await extractText(pdf, { mergePages: false });
  console.log('=== ' + f + ' (pages: ' + text.length + ') ===');
  console.log(text[0].replace(/\s+/g, ' ').slice(0, 500));
  console.log();
}
