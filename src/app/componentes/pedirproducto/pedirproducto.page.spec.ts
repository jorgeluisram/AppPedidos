import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PedirproductoPage } from './pedirproducto.page';

describe('PedirproductoPage', () => {
  let component: PedirproductoPage;
  let fixture: ComponentFixture<PedirproductoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedirproductoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PedirproductoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
