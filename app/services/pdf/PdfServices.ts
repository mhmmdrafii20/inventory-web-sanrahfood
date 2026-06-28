import puppeteerCore from 'puppeteer-core';
import puppeteer from 'puppeteer'
import chromium from "@sparticuz/chromium";

export class PdfServices {
    static async generatePdf(html: string) {
    let browser;
    if (process.env.NODE_ENV === "production") {

        browser = await puppeteerCore.launch({
            headless: "shell",
            args: chromium.args,
            executablePath: await chromium.executablePath(),
        });
    } else {
        browser = await puppeteer.launch({
           headless: true,
        });
    }
    const page = await browser.newPage();
    await page.setContent(html);

    const pdf = await page.pdf({
        format: "A4",
        printBackground: true,
    });

    await browser.close();

    return pdf;
    }
}