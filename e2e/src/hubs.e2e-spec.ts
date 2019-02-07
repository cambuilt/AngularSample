import { browser, element, by } from 'protractor';

describe('eMLC App', () => {
	let elementFound = false;
	let elementIndex = 0;
	browser.waitForAngularEnabled(false);

	browser.get('/');

	browser.driver.sleep(3000);
	element(by.className('input-username')).sendKeys('joshtsa');
	element(by.className('input-password')).sendKeys('Password1!');
	browser.driver.sleep(1000);
	element(by.className('button-sign-in')).click();
	browser.driver.sleep(2000);

	it('should open menu', () => {
		element(by.className('btn-menu')).click();
		browser.driver.sleep(2000);
	});

	it('should drop relationship panel', () => {
		element(by.id('relationshipPanel')).click();
		browser.driver.sleep(2000);
	});

	it('should select hubs', () => {
		element(by.id('menu-hubs')).click();
		browser.driver.sleep(1000);
	});

	it('should open filter component', () => {
		element(by.id('hubFilterIcon')).click();
		browser.driver.sleep(1000);
	});

	it('should run a search', () => {
		let search = 'CB4';
		element(by.id('filterInput1')).sendKeys(search);
		browser.driver.sleep(3000);
		element(by.id('submitFilter')).click();
		browser.driver.sleep(1500);
	});


	// find CB4
	it('should return data', () => {
		element(by.id('hub-maintenance-table')).$$('tr').then((rows) => {
			let count = 0;
			rows.forEach(row => {
				row.getText().then((text) => {
					console.log('row text', text);
					if ((text.indexOf('CB4') > -1)) {
						elementIndex = count;
						return;
					}
					count += 1;
				});
			});
		});
	});


	it('should click on CB4', () => {
		element(by.id('hub-maintenance-table')).$$('tr').get(elementIndex).click();
		browser.driver.sleep(1000);
	});

	it('should open the drawer', () => {
		element(by.id('hubEditIcon')).click();
		browser.driver.sleep(1000);
	});

	it('should add a user', () => {
		element(by.id('hubAddUser')).click();
		browser.driver.sleep(2000);
	});


	it('should search a user', () => {
		element.all(by.id('userSelectorFilterIcon')).then((filterButtons) => {
			filterButtons.forEach(button => {
				button.isDisplayed().then((displayed) => {
					if (displayed === true) {
						console.log('clicked the button');
						button.click();
					}
				});
			});
			browser.driver.sleep(1000);
		});
		element.all(by.id('userSelectorFilterInput')).then((filterInputs) => {
			filterInputs.forEach(input => {
				input.isDisplayed().then((displayed) => {
					if (displayed === true) {
						browser.driver.sleep(500);
						input.sendKeys('josh jancula');
					}
				});
			});
			browser.driver.sleep(1000);
		});
	});

	it('should select josh', () => {
		element(by.className('checkBoxDiv selectorCheckbox mat-icon material-icons')).click();
		browser.driver.sleep(1000);
	});

	it('should click the save button', () => {
		element.all(by.id('userSelectorSaveButton')).then((buttons) => {
			buttons.forEach(button => {
				button.isDisplayed().then((displayed) => {
					if (displayed === true) {
						button.click();
					}
				});
			});
			browser.driver.sleep(2000);
		});
	});


	it('should click the overlay', () => {
		element(by.className('drawer-overlay show')).click();
		browser.driver.sleep(2000);
	});

	it('should click no', () => {
		element(by.className('btn-alert-ok btn-alert-no')).click();
		browser.driver.sleep(3000);
	});


});
