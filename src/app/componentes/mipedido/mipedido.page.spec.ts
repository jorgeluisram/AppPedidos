import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MipedidoPage } from './mipedido.page';

describe('MipedidoPage', () => {
  let component: MipedidoPage;
  let fixture: ComponentFixture<MipedidoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MipedidoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MipedidoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
