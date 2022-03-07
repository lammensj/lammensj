import fs from 'fs';
import {join} from 'path';
import {unified} from 'unified';
import remarkParse from 'remark-parse';
import remarkHtml from 'remark-html';

class ContentService {
    protected parsedContent: any;
    protected parsedIntro: string = '';

    public constructor() {
        const fileContents = fs.readFileSync(join(process.cwd(), './src/assets/markdown/README.md'), 'utf8');
        this.parsedContent = unified()
            .use(remarkParse)
            .parse(fileContents);
    }

    public getHeaders(): Array<{ label: string; target: string }> {
        return this.parsedContent.children
            .filter((child: { type: string, depth: number }) => {
                return child.type === 'heading' && child.depth === 2;
            })
            .map((child: { children: Array<{ value: string }> }) => {
                const label: string = child.children[0].value;
                const target: string = label.replace(/\W/, '-').toLowerCase();
                return {label, target};
            });
    }

    public async getContent(): Promise<Array<string>> {
        const fileContents = fs.readFileSync(join(process.cwd(), './src/assets/markdown/README.md'), 'utf8');

        const contentParts: Array<string> = [];
        let header: string = '';
        fileContents
            .match(/^#+ [^#]*(?:#(?!#)[^#]*)*/gm)
            .filter(Boolean)
            .forEach((content: string) => {
                if (content.startsWith('## ')) {
                    contentParts.push(content);
                } else if (contentParts.length === 0) {
                    header += content;
                } else {
                    const index: Number = contentParts.length - 1;
                    contentParts[index] += content;
                }
            });

        const parsedIntro = await unified()
            .use(remarkParse)
            .use(remarkHtml)
            .process(header);
        this.parsedIntro = String(parsedIntro);

        return await Promise.all(contentParts.map(async (content) => {
            const result = await unified()
                .use(remarkParse)
                .use(remarkHtml)
                .process(content);

            return String(result);
        }));
    }

    public getParsedIntro(): string {
        return this.parsedIntro;
    }
}

export default ContentService;
