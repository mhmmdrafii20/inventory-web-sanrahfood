import edge from 'edge.js';

export default class TemplateService {
    static async render(template: string, data: any) {
        return await edge.render(`pdf/${template}`, data);
    }
}