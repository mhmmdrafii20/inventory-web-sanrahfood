import puppeteer from 'puppeteer';
import { execSync } from 'node:child_process'

export class PdfServices {
    static async generatePdf(html: string) {
        try {
            console.log('=== FIND CHROMIUM ===')
            console.log(execSync('find / -name chromium 2>/dev/null || true').toString())
            console.log(execSync('find / -name chrome 2>/dev/null || true').toString())
        } catch (e) {
        console.error(e)
        }

        const browser = await puppeteer.launch({
            headless: true,
            executablePath: '/opt/google/chrome/chrome', 
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
            ],
        });
        const page = await browser.newPage();

        await page.setContent(html, { waitUntil: 'networkidle0' });

        const pdf = await page.pdf({
            format: 'A4',
            printBackground: true,
        })

        await browser.close();
        return pdf
    }
}