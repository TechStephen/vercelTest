import { DataType } from './../pages/model/DataType';
import { test, expect } from '@playwright/test'

// test('Navigation Works', async ({ page }) => {
//     // go to link
//     await page.goto('http://localhost:3000/Home');

//     // click nav button to go to posts page called 'Posts'
//     await page.click("text=Posts");

//     // expect our new url to be the link below
//     await expect(page).toHaveURL('http://localhost:3000/Posts/allPosts');

//     // expect this page to have title Post
//     await expect(page.locator('text=Posts')).toBeTruthy();

// });

// test('API Returns Data Successfully', async ({ page, request }) => {
//     const getRequest = await request.get('http://localhost:3000/api/data/allPosts')
//     expect(await getRequest.ok()).toBeTruthy();
//     expect(await getRequest.status()).toBe(200)
// });

// test('API Returns Specified Data Corrected', async ({ page, request }) => {
//     console.log(page.toString());
//     console.log(page);
//     const getRequest = await request.get('http://localhost:3000/api/data/1')
//     expect(await getRequest.ok()).toBeTruthy();
//     expect(await getRequest.status()).toBe(200)
//     expect(await getRequest.json()).toHaveProperty('id', 1);
//     expect(await getRequest.json()).toHaveProperty('title', 'Todays News');
//     expect(await getRequest.json()).toHaveProperty('body', 'The queen is dead');
// });

test('POST request to built in API', async ({ page, request }) => {
    await page.goto('http://localhost:3000/Create');
    await page.locator('#title').fill('New Post')
    await page.locator('#body').fill('New Body')
    await page.locator('text=Submit').click();
    await page.goto('http://localhost:3000/Posts/allPosts');
    await expect(page.locator('text=New Post')).toBeTruthy();
    await expect(page.locator('text=New Body')).toBeTruthy();
});