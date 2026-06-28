import puppeteer from 'puppeteer-core';

export class PdfServices {
    static async generatePdf(html: string) {
    const browser = await puppeteer.connect({ browserWSEndpoint: process.env.BROWSER_WS_ENDPOINT });

        const page = await browser.newPage();

        await page.setContent(html);

        const pdf = await page.pdf({
            format: 'A4',
            printBackground: true,
        })

        await browser.close();
        return pdf
    }
}