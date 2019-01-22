import { browser, element, by } from 'protractor';

describe('Messaging 2 Test', () => {
	let newMessage = '';

	browser.waitForAngularEnabled(false);
	browser.get('/');

	browser.driver.sleep(2000);
	element(by.className('input-username')).sendKeys('camerontsa');
	element(by.className('input-password')).sendKeys('Password1!');
	browser.driver.sleep(1000);
	element(by.className('button-sign-in')).click();
	browser.driver.sleep(2000);

	it('should open messaging', () => {
		element(by.className('messaging-icon')).click();
		browser.driver.sleep(2000);
	});

	it('should select broadcast tab and select samantha', () => {
		element(by.id('broadcastTab')).click();
		browser.driver.sleep(3000);
		element.all(by.className('broadcastGroupRow')).then((rows) => {
			console.log('rows is', rows);
		});
		browser.driver.sleep(3000);
	});
});
