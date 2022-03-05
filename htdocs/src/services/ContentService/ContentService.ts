import fs from 'fs';
import {join} from 'path';
import {unified} from 'unified';
import remarkParse from 'remark-parse';

class ContentService {
    protected parsedContent: any;

    private constructor() {
        const fileContents = fs.readFileSync(join(process.cwd(), './src/assets/markdown/README.md'), 'utf8');
        this.parsedContent = unified()
            .use(remarkParse)
            .parse(fileContents);
    }

    public getHeaders(): Array<{label: string; target: string}> {
        return this.parsedContent.children
            .filter((child) => {
                return child.type === 'heading' && child.depth === 2;
            })
            .map((child) => {
                const label: string = child.children[0].value;
                const target: string = label.replace(/\W/, '-').toLowerCase();
                return {label, target};
            });
    }
}

export default ContentService;
