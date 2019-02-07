import { MessagingService } from './messaging.service';
import { AuthService } from './auth.service';
import { HttpModule } from '@angular/http';
import { TestBed } from '@angular/core/testing';
// import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginatorIntl, MatDialog } from '@angular/material';

let authService: AuthService;
let messagingService: MessagingService;

describe('AuthService', () => {
	let mockRouter;
	let mockMatDialog;
	jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

	beforeEach(() => { mockRouter = new MockRouter(); mockMatDialog = new MockMatDialog();
		TestBed.configureTestingModule({imports: [HttpModule], providers: [AuthService, MessagingService, { provide: Router, useValue: mockRouter }, { provide: MatDialog, useValue: mockMatDialog }]});
		authService = TestBed.get(AuthService);
		messagingService = TestBed.get(MessagingService);
	});

	it('should get user account status', (done: DoneFn) => {
		authService.getUserAccountStatus('camrsa', 'Password2!').subscribe(response => {
			expect(response.status).toBe(200);
			done();
		}, error => {
			fail(`Error: ${error}`);
		});
	});

	it('should successfully login', (done: DoneFn) => {
		const desktopJWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXAiOiJEZXNrdG9wIn0=.zT3I6hOak90xH5VEhSzLtVMHeBeaSnn0PD4rNBC1dRM=';
		authService.login('rsa', 'camrsa', 'Password2!', desktopJWT, '').subscribe(response => {
			expect(response.status).toBe(200);
			const json = response.json();
			const role = 'RMP_RSA';
			authService.currentUser.avatarURL = json.AvatarURL;
			authService.currentUser.role = role;
			authService.currentUser.landingPage = json.LandingPage;
			authService.currentUser.name = `${json.FirstName} ${json.LastName}`;
			authService.currentUser.email = json.Email;
			authService.currentUser.tenantId = json.TenantId;
			authService.currentUser.username = this.username;
			localStorage.setItem('currentUser', JSON.stringify(authService.currentUser));
			localStorage.setItem('sessionToken', json.SessionToken);
			console.log('login is done');

			// it('test', () => {
			// 	expect(1 + 1).toBe(2);
			// });
			done();
		}, error => {
			fail(`Error: ${error}`);
		});
	});

	it('should return messages', (done) => {
		const token = localStorage.getItem('sessionToken');
		console.log('token is', authService.currentUser.sessionToken);
		authService.currentUser.sessionToken = token;
		authService.currentUser.role = 'RMP_RSA';
		console.log('authService.currentUser.role is', authService.currentUser.role, ', token is', authService.currentUser.sessionToken);
		messagingService.getMessageHistory().subscribe(response => {
			const messages = response.json();
			expect(messages.length).toBeGreaterThan(0);
			done();
		}, error => {
			console.log('getMessageHistory error is', error);
		});
	});
});

class MockRouter {
	//noinspection TypeScriptUnresolvedFunction
	navigate = jasmine.createSpy('navigate');
}
class MockMatDialog {

}
