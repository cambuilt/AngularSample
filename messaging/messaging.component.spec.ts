import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { routing } from '../app.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from '../app.component';
import { HttpModule } from '@angular/http';
import { MessagingService } from '../services/messaging.service';
import { MessagingComponent } from './messaging.component';
import { MessagingChatComponent } from '../messaging-chat/messaging-chat.component';
import { MessagingListAddComponent } from '../messaging-list-add/messaging-list-add.component';
import { UserSelectorComponent } from '../user-selector/user-selector.component';
import { TenantSelectorComponent } from '../tenant-selector/tenant-selector.component';
import { MatIconModule, MatTabsModule, MatCheckboxModule, MatToolbarModule, MatCardModule, MatFormFieldModule } from '@angular/material';
import { APP_BASE_HREF } from '@angular/common';

describe('MessagingComponent', () => {
	let component: ComponentFixture<AppComponent>;
	let element: DebugElement;
	let html: HTMLElement;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ BrowserModule, FormsModule, HttpModule, MatIconModule, MatTabsModule, MatCheckboxModule, MatToolbarModule, MatCardModule, MatFormFieldModule, routing],
			declarations: [ AppComponent, MessagingComponent, MessagingChatComponent, MessagingListAddComponent, UserSelectorComponent, TenantSelectorComponent ],
			providers: [ { provide: APP_BASE_HREF, useValue: '/' } ]
		});

		component = TestBed.createComponent(AppComponent);
	});

	it('should have a title', () => {
		let title = '';
		component.detectChanges();
		console.log(' is', component.debugElement);
		element = component.debugElement.query(By.css('router-outlet'));
		html = element.nativeElement;

		expect(html.innerText).toBe(title);
	});
});

