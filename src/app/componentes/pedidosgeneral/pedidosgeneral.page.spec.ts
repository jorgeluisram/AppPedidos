import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PedidosgeneralPage } from './pedidosgeneral.page';

describe('PedidosgeneralPage', () => {
  let component: PedidosgeneralPage;
  let fixture: ComponentFixture<PedidosgeneralPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidosgeneralPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PedidosgeneralPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
