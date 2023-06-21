const puppeteer = require('puppeteer');
const crypto = require('crypto');
const fs = require('fs');

const app = require('express')();
const baseDir = process.env.DATA_DIR || '/app/data';
const chromePath = undefined;

// Args to run chrome with
const args = ['--no-sandbox', '--disable-setuid-sandbox']

app.get('/image', async (req, res) => {
    const url = req.query.url;
    if (!url) {
        return res.status(400).send('Missing url parameter');
    }

    const id = crypto.randomBytes(16).toString('hex');
    const filePath = `${baseDir}/screenshots/${id}.webp`;

    if (!fs.existsSync(filePath)) {
        fs.mkdirSync(`${baseDir}/screenshots`, { recursive: true });
    }

    const browser = await puppeteer.launch({ headless: 'new', executablePath: chromePath, args: args });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });
    await page.screenshot({ type: 'webp', path: filePath });

    await browser.close();

    // Send the file to the user.
    res.contentType('image/webp');
    res.sendFile(filePath);
});

app.get('/pdf', async (req, res) => {
    const url = req.query.url;
    if (!url) {
        return res.status(400).send('Missing url parameter');
    }

    const id = crypto.randomBytes(16).toString('hex');
    const filePath = `${baseDir}/pdfs/${id}.pdf`;

    if (!fs.existsSync(filePath)) {
        fs.mkdirSync(`${baseDir}/pdfs`, { recursive: true });
    }

    const browser = await puppeteer.launch({ headless: 'new', executablePath: chromePath, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });
    await page.pdf({ path: filePath, format: 'A4' });

    await browser.close();

    // Send the file to the user.
    res.contentType('application/pdf');
    res.sendFile(filePath);
});

app.get('/list/pdf', async (req, res) => {
    const dir = `${baseDir}/pdfs`;
    const files = fs.readdirSync(dir);
    const pdfs = files.filter(f => f.endsWith('.pdf'));
    res.json(pdfs);
});

app.get('/list/image', async (req, res) => {
    const dir = `${baseDir}/screenshots`;
    const files = fs.readdirSync(dir);
    const images = files.filter(f => f.endsWith('.webp'));
    res.json(images);
});

app.get('/pdf/:id', async (req, res) => {
    const id = req.params.id;
    const filePath = `${baseDir}/pdfs/${id}.pdf`;
    if (!fs.existsSync(filePath)) {
        return res.status(404).send('File not found');
    }

    // Send the file to the user.
    res.contentType('application/pdf');
    res.sendFile(filePath);
});

app.get('/image/:id', async (req, res) => {
    const id = req.params.id;
    const filePath = `${baseDir}/screenshots/${id}.webp`;
    if (!fs.existsSync(filePath)) {
        return res.status(404).send('File not found');
    }

    // Send the file to the user.
    res.contentType('image/webp');
    res.sendFile(filePath);
});

app.get('/delete/pdf/:id', async (req, res) => {
    const id = req.params.id;
    const filePath = `${baseDir}/pdfs/${id}.pdf`;
    if (!fs.existsSync(filePath)) {
        return res.status(404).send('File not found');
    }

    fs.unlinkSync(filePath);
    res.send('File deleted');
});

app.get('/delete/image/:id', async (req, res) => {
    const id = req.params.id;
    const filePath = `${baseDir}/screenshots/${id}.webp`;
    if (!fs.existsSync(filePath)) {
        return res.status(404).send('File not found');
    }

    fs.unlinkSync(filePath);
    res.send('File deleted');
});

app.get('/delete/all', async (req, res) => {
    const pdfDir = `${baseDir}/pdfs`;
    const pdfFiles = fs.readdirSync(pdfDir);
    pdfFiles.forEach(f => fs.unlinkSync(`${pdfDir}/${f}`));

    const imageDir = `${baseDir}/screenshots`;
    const imageFiles = fs.readdirSync(imageDir);
    imageFiles.forEach(f => fs.unlinkSync(`${imageDir}/${f}`));

    res.send('All files deleted');
});

app.get('/exit', async (req, res) => {
    process.exit(0);
});

app.listen(4000, () => console.log('Listening on port 4000'));