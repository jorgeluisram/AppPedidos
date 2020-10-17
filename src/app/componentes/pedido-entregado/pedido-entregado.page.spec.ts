import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PedidoEntregadoPage } from './pedido-entregado.page';

describe('PedidoEntregadoPage', () => {
  let component: PedidoEntregadoPage;
  let fixture: ComponentFixture<PedidoEntregadoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidoEntregadoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PedidoEntregadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
