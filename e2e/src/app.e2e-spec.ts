import { browser, element, by } from 'protractor';

describe('eMLC App', () => {
	browser.waitForAngularEnabled(false);
	// beforeEach(() => {
	// });

	browser.get('/');

	browser.driver.sleep(3000);
	element(by.className('input-username')).sendKeys('camerontsa');
	element(by.className('input-password')).sendKeys('Password1!');
	browser.driver.sleep(1000);
	element(by.className('button-sign-in')).click();
	browser.driver.sleep(2000);

	it('should open messaging', (done) => {
		element(by.className('messaging-icon')).click();
		browser.driver.sleep(4000);
		// element(by.className('deletedMessageIds')).getText().then((text) => {
		// 	console.log('deleted messages', text);
		// });
		element(by.className('inboxCard')).$$('.inboxRow').then((rows) => {
			rows.forEach(row => {
				const lastMessageTime = row.$('#time-span');
				lastMessageTime.getText().then((text) => {
					console.log('lastMessageTime', text);
				});
			});
		});
		done();
	});
});

