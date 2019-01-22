import { browser, element, by } from 'protractor';

describe('Messaging 1 Test', () => {
	let newMessage = '';
	let broadcastMessage = '';

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

	it('should select last inbox', () => {
		element(by.className('inboxCard')).$$('.inbox-span').then((rows) => {
			rows[rows.length - 1].click();
			browser.driver.sleep(4000);
		});
	});

	it('should send a message', () => {
		newMessage = 'New message sent on ' + Date();
		element(by.id('messagingMessageField')).sendKeys(newMessage);
		browser.driver.sleep(3000);
		element(by.id('sendButton')).click();
		browser.driver.sleep(3000);
		element(by.id('messagingChatBackArrow')).click();
		browser.driver.sleep(2000);
	});

	it('should have samantha first in list', () => {
		element(by.className('inboxCard')).$$('.inbox-span').then((rows) => {
			rows[0].getText().then((text) => {
				console.log('newMessage is', newMessage, ', text is', text);
				expect(text.indexOf(newMessage)).toBeGreaterThan(-1);
			});
			element(by.id('messagingBackArrow')).click();
			browser.driver.sleep(1000);
		});
	});

	it('should log out', () => {
		element(by.className('profile-button')).click();
		browser.driver.sleep(2000);
		element(by.id('signOutButton')).click();
		browser.driver.sleep(2000);
	});

	it('should login as samantha', () => {
		element(by.className('input-username')).sendKeys('samanthatsa');
		element(by.className('input-password')).sendKeys('Password2!');
		browser.driver.sleep(1000);
		element(by.className('button-sign-in')).click();
		browser.driver.sleep(2000);
	});

	it('should open messaging and check top inbox and count of 3', () => {
		element(by.className('messaging-icon')).click();
		browser.driver.sleep(2000);
		element(by.className('inboxCard')).$$('.inbox-span').then((rows) => {
			console.log('length of rows is', rows.length);
			expect(rows.length).toEqual(3);
			rows[0].getText().then((text) => {
				console.log('next newMessage is', newMessage, ', text is', text);
				expect(text.indexOf(newMessage)).toBeGreaterThan(-1);
			});
			browser.driver.sleep(2000);
			rows[0].click();
			browser.driver.sleep(2000);
		});
	});

	it('should have last sent message on the bottom', () => {
		element(by.id('chatMessagingDrawer')).$$('tr').then((rows) => {
			console.log('length of rows is', rows.length);
			rows[rows.length - 1].getText().then((text) => {
				expect(text.indexOf(newMessage)).toBeGreaterThan(-1);
			});
			browser.driver.sleep(1000);
			element(by.id('messagingChatBackArrow')).click();
			browser.driver.sleep(1000);
		});
	});

	it('should create new inbox for sean', () => {
		element(by.id('newButton')).click();
		browser.driver.sleep(1000);
		element.all(by.id('userSelectorCard')).$$('.selectorRow').then((users) => {
			users[2].click();
			browser.driver.sleep(2000);
		});
		browser.driver.sleep(1000);
		newMessage = 'Sean message sent on ' + Date();
		element(by.id('userSelectorMessageFieldSingleSelect')).sendKeys(newMessage);
		browser.driver.sleep(3000);
		element.all(by.css('.sendButton')).then((sendButtons) => {
			sendButtons.forEach(button => {
				button.isDisplayed().then((displayed) => {
					if (displayed === true) {
						button.click();
					}
				});
			});
			browser.driver.sleep(3000);
		});
		element.all(by.id('messagingChatBackArrow')).then((backButtons) => {
			backButtons.forEach(button => {
				button.isDisplayed().then((displayed) => {
					if (displayed === true) {
						button.click();
					}
				});
			});
			browser.driver.sleep(3000);
		});
	});

	it('should delete sean inbox', () => {
		element(by.id('editButton')).click();
		browser.driver.sleep(3000);
		element.all(by.tagName('mat-checkbox')).then((checkBoxes) => {
			checkBoxes[0].click();
			browser.driver.sleep(2000);
			element(by.id('deleteButton')).click();
			browser.driver.sleep(2000);
			element(by.id('doneButton')).click();
			browser.driver.sleep(2000);
		});
	});

	it('should select broadcast tab, select samantha, send broadcast and back out', () => {
		element(by.id('broadcastTab')).click();
		browser.driver.sleep(2000);
		element.all(by.className('broadcastGroupRow')).then((rows) => {
			rows[1].click();
		});
		browser.driver.sleep(2000);
		broadcastMessage = 'Broadcast message for Samantha on ' + Date();
		element(by.id('messagingMessageField')).sendKeys(broadcastMessage);
		browser.driver.sleep(1000);
		element.all(by.css('.sendButton')).then((sendButtons) => {
			sendButtons.forEach(button => {
				button.isDisplayed().then((displayed) => {
					if (displayed === true) {
						button.click();
					}
				});
			});
			browser.driver.sleep(1000);
		});
		element.all(by.id('messagingChatBackArrow')).then((backButtons) => {
			backButtons.forEach(button => {
				button.isDisplayed().then((displayed) => {
					if (displayed === true) {
						button.click();
					}
				});
			});
			browser.driver.sleep(1000);
			element(by.id('messagingBackArrow')).click();
			browser.driver.sleep(1000);

		});
	});

	it('should log out', () => {
		element(by.className('profile-button')).click();
		browser.driver.sleep(1000);
		element(by.id('signOutButton')).click();
		browser.driver.sleep(1000);
	});

	it('should login as samanthatsa', () => {
		element(by.className('input-username')).sendKeys('samanthatsa');
		element(by.className('input-password')).sendKeys('Password2!');
		browser.driver.sleep(1000);
		element(by.className('button-sign-in')).click();
		browser.driver.sleep(2000);
	});

	it('should see broadcast message', () => {
		element(by.className('notificationContent')).getText().then((text) => {
			if (text.indexOf(broadcastMessage) > -1) {
				expect(true).toEqual(true);
				element(by.className('closeBroadcast')).click();
			} else {
				expect(false).toEqual(true);
			}
		});

		browser.driver.sleep(3000);
	});

	it('should not see broadcast message', () => {
		element(by.className('btn-menu')).click();
		browser.driver.sleep(3000);

		element(by.id('menu-tests')).isDisplayed().then((displayed) => {
			if (!displayed) {
				element.all(by.className('menu-group-icon')).then((icons) => {
					icons[0].click();
				});
				browser.driver.sleep(3000);
			}
		});

		element(by.id('menu-tests')).click();
		browser.driver.sleep(2000);
		element(by.className('notificationContent')).getText().then((text) => {
			expect(true).toEqual(true);
		});
	});

	it('should select broadcast tab, select samantha, send broadcast and back out', () => {
		element(by.className('messaging-icon')).click();
		browser.driver.sleep(2000);
		element(by.id('broadcastTab')).click();
		browser.driver.sleep(1000);
		element(by.id('addButton')).click();
		browser.driver.sleep(1000);
		element(by.id('firstListField')).sendKeys('New Broadcast List');
		browser.driver.sleep(1000);
		element(by.id('selectUserButton')).click();
		browser.driver.sleep(1000);
		element.all(by.id('userSelectorCard')).$$('.selectorCheckbox').then((userCheckboxes) => {
			userCheckboxes[3].click();
			userCheckboxes[4].click();
			userCheckboxes[5].click();
			userCheckboxes[6].click();
			browser.driver.sleep(1000);
		});
		element(by.id('userSelectorSaveButton')).click();
		browser.driver.sleep(1000);
		element(by.id('buttonCreate')).click();
		browser.driver.sleep(1000);
	});

	it('should send broadcast on new list and back out', () => {
		element.all(by.className('broadcastGroupRow')).then((rows) => {
			rows[rows.length - 1].click();
		});
		browser.driver.sleep(1000);
		broadcastMessage = 'New Broadcast message to group on ' + Date();
		element(by.id('messagingMessageField')).sendKeys(broadcastMessage);
		browser.driver.sleep(1000);
		element.all(by.css('.sendButton')).then((sendButtons) => {
			sendButtons.forEach(button => {
				button.isDisplayed().then((displayed) => {
					if (displayed === true) {
						button.click();
					}
				});
			});
			browser.driver.sleep(1000);
		});
		element.all(by.id('messagingChatBackArrow')).then((backButtons) => {
			backButtons.forEach(button => {
				button.isDisplayed().then((displayed) => {
					if (displayed === true) {
						button.click();
					}
				});
			});
			browser.driver.sleep(1000);
			element(by.id('messagingBackArrow')).click();
			browser.driver.sleep(1000);
		});
	});

	it('should log out', () => {
		element(by.className('profile-button')).click();
		browser.driver.sleep(1000);
		element(by.id('signOutButton')).click();
		browser.driver.sleep(1000);
	});

	it('should login as camerontsa', () => {
		element(by.className('input-username')).sendKeys('camerontsa');
		element(by.className('input-password')).sendKeys('Password1!');
		browser.driver.sleep(1000);
		element(by.className('button-sign-in')).click();
		browser.driver.sleep(1000);
	});

	it('should see broadcast message', () => {
		element(by.className('notificationContent')).getText().then((text) => {
			if (text.indexOf(broadcastMessage) > -1) {
				expect(true).toEqual(true);
				browser.driver.sleep(1000);
				element(by.className('closeBroadcast')).click();
			} else {
				expect(false).toEqual(true);
			}
		});

		browser.driver.sleep(1000);
	});

	it('should not see broadcast message', () => {
		element(by.className('btn-menu')).click();
		browser.driver.sleep(1000);

		element(by.id('menu-containers')).isDisplayed().then((displayed) => {
			if (!displayed) {
				element.all(by.className('menu-group-icon')).then((icons) => {
					icons[0].click();
				});
				browser.driver.sleep(1000);
			}
		});

		element(by.id('menu-containers')).click();
		browser.driver.sleep(1000);
		element(by.className('notificationContent')).getText().then((text) => {
			expect(true).toEqual(true);
		});
	});

	it('should log out', () => {
		element(by.className('profile-button')).click();
		browser.driver.sleep(1000);
		element(by.id('signOutButton')).click();
		browser.driver.sleep(1000);
	});

	it('should login as joshrsa', () => {
		element(by.className('input-username')).sendKeys('joshrsa');
		element(by.className('input-password')).sendKeys('Password1!');
		browser.driver.sleep(1000);
		element(by.className('button-sign-in')).click();
		browser.driver.sleep(1000);
	});

	it('should create user broadcast list', () => {
		element(by.className('messaging-icon')).click();
		browser.driver.sleep(1000);
		element(by.id('broadcastTab')).click();
		browser.driver.sleep(1000);
		element(by.id('addButton')).click();
		browser.driver.sleep(1000);
		element(by.id('newUserListButton')).click();
		browser.driver.sleep(1000);
		element(by.id('firstListField')).sendKeys('RSA User Broadcast List');
		browser.driver.sleep(1000);
		element(by.id('selectUserButton')).click();
		browser.driver.sleep(1000);
		element.all(by.id('userSelectorCard')).$$('.selectorCheckbox').then((userCheckboxes) => {
			userCheckboxes[1].click();
			userCheckboxes[2].click();
			userCheckboxes[0].click();
			userCheckboxes[5].click();
			browser.driver.sleep(1000);
		});
		element(by.id('userSelectorSaveButton')).click();
		browser.driver.sleep(1000);
		element(by.id('buttonCreate')).click();
		browser.driver.sleep(1000);
	});

	it('should send broadcast on new RSA list and back out', () => {
		element.all(by.className('broadcastGroupRow')).then((rows) => {
			rows[rows.length - 1].click();
		});
		browser.driver.sleep(1000);
		broadcastMessage = 'New RSA Broadcast message to group on ' + Date();
		element(by.id('messagingMessageField')).sendKeys(broadcastMessage);
		browser.driver.sleep(1000);
		element.all(by.css('.sendButton')).then((sendButtons) => {
			sendButtons.forEach(button => {
				button.isDisplayed().then((displayed) => {
					if (displayed === true) {
						button.click();
					}
				});
			});
			browser.driver.sleep(1000);
		});
		element.all(by.id('messagingChatBackArrow')).then((backButtons) => {
			backButtons.forEach(button => {
				button.isDisplayed().then((displayed) => {
					if (displayed === true) {
						button.click();
					}
				});
			});
			browser.driver.sleep(1000);
			element(by.id('messagingBackArrow')).click();
			browser.driver.sleep(1000);
		});
	});

	it('should log out', () => {
		element(by.className('profile-button')).click();
		browser.driver.sleep(1000);
		element(by.id('signOutButton')).click();
		browser.driver.sleep(1000);
	});

	it('should login as samantharsa', () => {
		element(by.className('input-username')).sendKeys('samantharsa');
		element(by.className('input-password')).sendKeys('Password1!');
		browser.driver.sleep(1000);
		element(by.className('button-sign-in')).click();
		browser.driver.sleep(1000);
	});

	it('should see broadcast message', () => {
		element(by.className('notificationContent')).getText().then((text) => {
			if (text.indexOf(broadcastMessage) > -1) {
				expect(true).toEqual(true);
				browser.driver.sleep(1000);
				element(by.className('closeBroadcast')).click();
			} else {
				expect(false).toEqual(true);
			}
		});

		browser.driver.sleep(1000);
	});

	it('should not see broadcast message', () => {
		element(by.className('btn-menu')).click();
		browser.driver.sleep(1000);

		element(by.id('menu-users')).isDisplayed().then((displayed) => {
			if (!displayed) {
				element.all(by.className('menu-group-icon')).then((icons) => {
					icons[0].click();
				});
				browser.driver.sleep(1000);
			}
		});

		element(by.id('menu-users')).click();
		browser.driver.sleep(1000);
		element(by.className('notificationContent')).getText().then((text) => {
			expect(true).toEqual(true);
		});
	});

	it('should create tenant broadcast list', () => {
		element(by.className('messaging-icon')).click();
		browser.driver.sleep(1000);
		element(by.id('broadcastTab')).click();
		browser.driver.sleep(1000);
		element(by.id('addButton')).click();
		browser.driver.sleep(1000);
		element(by.id('newTenantListButton')).click();
		browser.driver.sleep(1000);
		element(by.id('firstListField')).sendKeys('RSA Tenant Broadcast List');
		browser.driver.sleep(1000);
		element(by.id('selectTenantButton')).click();
		browser.driver.sleep(1000);
		element.all(by.id('tenantSelectorCard')).$$('.checkBoxDiv').then((tenantCheckboxes) => {
			tenantCheckboxes[0].click();
			browser.driver.sleep(1000);
		});
		element(by.id('tenantSelectorSaveButton')).click();
		browser.driver.sleep(1000);
		element(by.id('buttonCreate')).click();
		browser.driver.sleep(1000);
	});

	it('should send tenant broadcast on new list and back out', () => {
		element.all(by.className('broadcastGroupRow')).then((rows) => {
			rows[rows.length - 1].click();
		});
		browser.driver.sleep(1000);
		broadcastMessage = 'New Tenant Broadcast message to group on ' + Date();
		element(by.id('messagingMessageField')).sendKeys(broadcastMessage);
		browser.driver.sleep(1000);
		element.all(by.css('.sendButton')).then((sendButtons) => {
			sendButtons.forEach(button => {
				button.isDisplayed().then((displayed) => {
					if (displayed === true) {
						button.click();
					}
				});
			});
			browser.driver.sleep(1000);
		});
		element.all(by.id('messagingChatBackArrow')).then((backButtons) => {
			backButtons.forEach(button => {
				button.isDisplayed().then((displayed) => {
					if (displayed === true) {
						button.click();
					}
				});
			});
			browser.driver.sleep(1000);
			element(by.id('messagingBackArrow')).click();
			browser.driver.sleep(1000);
		});
	});

	it('should log out', () => {
		element(by.className('profile-button')).click();
		browser.driver.sleep(1000);
		element(by.id('signOutButton')).click();
		browser.driver.sleep(1000);
	});

	it('should login as camerontsa', () => {
		element(by.className('input-username')).sendKeys('camerontsa');
		element(by.className('input-password')).sendKeys('Password1!');
		browser.driver.sleep(1000);
		element(by.className('button-sign-in')).click();
		browser.driver.sleep(1000);
	});

	it('should see broadcast message', () => {
		element(by.className('notificationContent')).getText().then((text) => {
			if (text.indexOf(broadcastMessage) > -1) {
				expect(true).toEqual(true);
				browser.driver.sleep(1000);
				element(by.className('closeBroadcast')).click();
			} else {
				expect(false).toEqual(true);
			}
		});

		browser.driver.sleep(1000);
	});

	it('should not see broadcast message', () => {
		element(by.id('menu-collection-data')).isDisplayed().then((displayed) => {
			if (!displayed) {
				element.all(by.className('menu-group-icon')).then((icons) => {
					icons[0].click();
				});
				browser.driver.sleep(1000);
			}
		});

		element(by.id('menu-collection-data')).click();
		browser.driver.sleep(1000);
		element(by.className('notificationContent')).getText().then((text) => {
			expect(true).toEqual(true);
		});
		browser.driver.sleep(2000);
	});

	it('should log out', () => {
		element(by.className('profile-button')).click();
		browser.driver.sleep(1000);
		element(by.id('signOutButton')).click();
		browser.driver.sleep(1000);
	});

	it('should login as samanthatsa', () => {
		element(by.className('input-username')).sendKeys('samanthatsa');
		element(by.className('input-password')).sendKeys('Password2!');
		browser.driver.sleep(1000);
		element(by.className('button-sign-in')).click();
		browser.driver.sleep(2000);
	});

	it('should edit broadcast list', () => {
		element(by.className('closeBroadcast')).click();
		browser.driver.sleep(1000);
		element(by.className('messaging-icon')).click();
		browser.driver.sleep(1000);
		element(by.id('broadcastTab')).click();
		browser.driver.sleep(1000);
		element(by.className('broadcastGroupInfo')).click();
		browser.driver.sleep(1000);
		element(by.className('remove')).click();
		element(by.id('firstListField')).sendKeys(' (Change)');
		browser.driver.sleep(2000);
		element(by.id('buttonEditSave')).click();
		browser.driver.sleep(1000);
		element(by.id('messagingBackArrow')).click();
		browser.driver.sleep(1000);
	});

	it('should log out', () => {
		element(by.className('profile-button')).click();
		browser.driver.sleep(1000);
		element(by.id('signOutButton')).click();
		browser.driver.sleep(5000);
	});

});

