import puppeteer from 'puppeteer';

let browser: any;
let page: any;



beforeAll(async () => {
    // launch browser
    browser = await puppeteer.launch(
        {
            headless: false, // headless mode set to false so browser opens up with visual feedback
        }
    );
    // creates a new page in the opened browser
    page = await browser.newPage()
});

// This function occurs after the result of each tests, it closes the browser
afterAll(() => {
    browser && browser.close();
});

test('it shows no repositories found when non existing repo entered', async () => {
    const inputSelector = 'input[placeholder="Enter repository name"]';
    await page.goto('http://localhost:3000/');
    await page.waitForSelector(inputSelector);
    // we don't want to make too many requests in tests, so type faster
    await page.type(inputSelector, 'react-is-not-the-best-framework-1234567890', { delay: 10 });
    await page.waitForSelector('div#no-repo-found');
}, 9000000);

test('it loads the app', async () => {
    const inputSelector = 'input[placeholder="Enter repository name"]';
    await page.goto('http://localhost:3000/');
    await page.waitForSelector(inputSelector);
    await page.type(inputSelector, 'react', { delay: 10 });
    await page.waitForSelector('table');
    const rows = await page.$$('tbody tr');
    expect(rows.length).toEqual(20);

    let paginatorLinks = await page.$$('#paginator a');
    // first and last link present in the beginning
    expect(paginatorLinks.length).toEqual(2);

    const nextLink = paginatorLinks[0];
    expect(await paginatorLinks[0]
        .evaluate((node: any) => node.innerText)).toEqual('next >');
    expect(await paginatorLinks[0]
        .evaluate((node: any) => node.href)).toEqual('http://localhost:3000/?repo=react&page=2');

    expect(await paginatorLinks[1]
        .evaluate((node: any) => node.innerText)).toEqual('last >>');
    expect(await paginatorLinks[1]
        .evaluate((node: any) => node.href)).toEqual('http://localhost:3000/?repo=react&page=50');

    await Promise.all([
        page.waitForNavigation(),
        nextLink.click(),
    ]);

    let location = await page.url();
    expect(location).toEqual('http://localhost:3000/?repo=react&page=2');

    // all paginator links should be present
    await page.waitForSelector('#paginator a:nth-child(4)');

    paginatorLinks = await page.$$('#paginator a');
    await Promise.all([
        page.waitForNavigation(), // The promise resolves after navigation has finished
        paginatorLinks[3].click()
    ]);

    location = await page.url();

    // our app shows 20 pages per page, 1000 results in total, max page is 50
    expect(location).toEqual('http://localhost:3000/?repo=react&page=50');
}, 9000000);


test('it opens details view for a repository', async () => {
    const testRepository = 'react';

    const inputSelector = 'input[placeholder="Enter repository name"]';
    await page.goto('http://localhost:3000/');
    await page.waitForSelector(inputSelector);
    await page.type(inputSelector, testRepository, { delay: 10 });
    await page.waitForSelector('table');

    const firstRepoLink = await page.$('tbody tr td a');
    const repositoryName = await firstRepoLink.evaluate((node: any) => node.innerText);

    await Promise.all([
        page.waitForNavigation(),
        firstRepoLink.click(),
    ]);

    await page.waitForSelector('#repository-details-table');
    const header = await page.$('h1');
    const headerText = await header.evaluate((node: any) => node.innerText);
    expect(headerText).toEqual(repositoryName);
}, 9000000);