import puppeteer from 'puppeteer';
import { execSync } from 'node:child_process'

export class PdfServices {
    static async generatePdf(html: string) {
        try {
            console.log('=== FIND CHROMIUM ===')
            console.log(execSync('find /root/.cache/puppeteer/chrome -type f 2>/dev/null || true').toString())
            console.log(execSync('ls -R /root/.cache/puppeteer/chrome').toString())
        } catch (e) {
        console.error(e)
        }

        const browser = await puppeteer.launch({
            headless: true,
            executablePath: ' "/root/.cache/puppeteer/chrome/linux-147.0.7727.57/chrome-linux64/chrome",', 
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