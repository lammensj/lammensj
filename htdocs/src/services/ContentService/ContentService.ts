import fs from 'fs';
import {join} from 'path';
import {unified} from 'unified';
import remarkParse from 'remark-parse';

class ContentService {
    protected parsedContent: any;

    public constructor() {
        const fileContents = fs.readFileSync(join(process.cwd(), './src/assets/markdown/README.md'), 'utf8');
        this.parsedContent = unified()
            .use(remarkParse)
            .parse(fileContents);
    }

    public getHeaders(): Array<{label: string; target: string}> {
        return this.parsedContent.children
            .filter((child: {type: string, depth: number}) => {
                return child.type === 'heading' && child.depth === 2;
            })
            .map((child: {children: Array<{value: string}>}) => {
                const label: string = child.children[0].value;
                const target: string = label.replace(/\W/, '-').toLowerCase();
                return {label, target};
            });
    }
}

export default ContentService;
