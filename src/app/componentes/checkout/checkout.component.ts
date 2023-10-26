import { PaymentInfo } from './../../model/PaymentInfo';
import { CheckoutValidar } from 'src/app/validar/CheckoutValidar';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Estado } from 'src/app/model/Estado';
import { Order } from 'src/app/model/order/Order';
import { OrderItem } from 'src/app/model/order/OrderItem';
import { Paises } from 'src/app/model/Paises';
import { Purchase } from 'src/app/model/order/Purchase';
import { CartService } from 'src/app/services/cart/Cart.service';
import { CheckoutService } from 'src/app/services/order/checkout.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup!: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  countries: Paises[] = [];

  theEmail!: string;

  shippingAddressStates: Estado[] = [];

  stripe = Stripe(environment.stripePublishableKey);

  paymentInfo: PaymentInfo = new PaymentInfo();
  cardElement: any;
  displayError: any = "";
  desativarBotao: boolean = false;

  constructor(private formBuilder: FormBuilder,
    // private luv2ShopFormService: Luv2ShopFormService,
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private router: Router) { }

  ngOnInit(): void {

    console.log(this.displayError)

    this.setupStripePaymentForm();

    this.theEmail = sessionStorage.getItem('email')!

    this.reviewCartDetails();

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        primeiroNome: new FormControl('',
          [Validators.required,
          Validators.minLength(2),
          CheckoutValidar.epacoBranco]),

        ultimoNome: new FormControl('',
          [Validators.required,
          Validators.minLength(2),
          CheckoutValidar.epacoBranco]),

        email: new FormControl(this.theEmail,
          [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
      }),
      shippingAddress: this.formBuilder.group({
        rua: new FormControl('', [Validators.required, Validators.minLength(2),
        CheckoutValidar.epacoBranco]),
        cidade: new FormControl('', [Validators.required, Validators.minLength(2),
        CheckoutValidar.epacoBranco]),
        estado: new FormControl('', [Validators.required]),
        pais: new FormControl('', [Validators.required]),
        codigoPostal: new FormControl('', [Validators.required, Validators.minLength(2),
        CheckoutValidar.epacoBranco])
      }),
      creditCard: this.formBuilder.group({

        // cardType: new FormControl('', [Validators.required]),
        // nameOnCard: new FormControl('', [Validators.required, Validators.minLength(2),
        // CheckoutValidar.epacoBranco]),
        // cardNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]{16}')]),
        // securityCode: new FormControl('', [Validators.required, Validators.pattern('[0-9]{3}')]),
        // expirationMonth: [''],
        // expirationYear: ['']

      })
    });

    // populate credit card months

    // const startMonth: number = new Date().getMonth() + 1;
    // console.log("startMonth: " + startMonth);

    // this.handleMonthsAndYears()

    // // // populate credit card years

    // this.checkoutService.getCartaodeCreditoAno().subscribe(
    //   data => {
    //     console.log("Retrieved credit card years: " + JSON.stringify(data));
    //     this.creditCardYears = data;
    //   }
    // );

    // populate countries

    this.checkoutService.getPaises().subscribe(
      data => {
        this.countries = data._embedded.countries;
      }
    );
  }

  setupStripePaymentForm() {
    var elements = this.stripe.elements()

    this.cardElement = elements.create('card', { hidePostalCode: true })

    this.cardElement.mount('#card-element');

    this.cardElement.on('change', (event: any) => {

      this.displayError = document.getElementById('card-errors');

      if (event.complete) {
        this.displayError.textContent = "";

      } else if (event.error) {
        console.log("Aqui");

        this.displayError.textContent = event.error.message;
      }
    });
  }

  reviewCartDetails() {


    // subscribe to cartService.totalQuantity
    this.cartService.totalQuantity.subscribe(
      totalQuantity => this.totalQuantity = totalQuantity
    );

    // subscribe to cartService.totalPrice
    this.cartService.totalPrice.subscribe(
      totalPrice => this.totalPrice = totalPrice
    );

    this.cartService.calcularSomaDosProdutos()
  }

  get firstName() { return this.checkoutFormGroup.get('customer.primeiroNome'); }
  get lastName() { return this.checkoutFormGroup.get('customer.ultimoNome'); }
  get email() { return this.checkoutFormGroup.get('customer.email'); }

  get shippingAddressStreet() { return this.checkoutFormGroup.get('shippingAddress.street'); }
  get shippingAddressCity() { return this.checkoutFormGroup.get('shippingAddress.city'); }
  get shippingAddressState() { return this.checkoutFormGroup.get('shippingAddress.estado'); }
  get shippingAddressZipCode() { return this.checkoutFormGroup.get('shippingAddress.zipCode'); }
  get shippingAddressCountry() { return this.checkoutFormGroup.get('shippingAddress.pais'); }

  get creditCardType() { return this.checkoutFormGroup.get('creditCard.cardType'); }
  get creditCardNameOnCard() { return this.checkoutFormGroup.get('creditCard.nameOnCard'); }
  get creditCardNumber() { return this.checkoutFormGroup.get('creditCard.cardNumber'); }
  get creditCardSecurityCode() { return this.checkoutFormGroup.get('creditCard.securityCode'); }

  onSubmit() {


    // set up order
    let order = new Order();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;

    // get cart items
    const cartItems = this.cartService.carItem;

    // create orderItems from cartItems
    // - long way
    /*
    let orderItems: OrderItem[] = [];
    for (let i=0; i < cartItems.length; i++) {
      orderItems[i] = new OrderItem(cartItems[i]);
    }
    */

    // - short way of doing the same thingy
    let orderItems: OrderItem[] = cartItems.map(tempCartItem => new OrderItem(tempCartItem));

    // set up purchase
    let purchase = new Purchase();

    // populate purchase - customer
    purchase.cliente = this.checkoutFormGroup.controls['customer'].value;

    // populate purchase - shipping address
    purchase.address = this.checkoutFormGroup.controls['shippingAddress'].value;
    const shippingState: Estado = JSON.parse(JSON.stringify(purchase.address.estado));
    const shippingCountry: Paises = JSON.parse(JSON.stringify(purchase.address.pais));
    purchase.address.estado = shippingState.name;
    purchase.address.pais = shippingCountry.name;

    var code: string = shippingCountry.code;

    console.log(shippingCountry.code)

    // populate purchase - order and orderItems
    purchase.order = order;
    purchase.orderItems = orderItems;

    this.paymentInfo.amount = Math.round(this.totalPrice * 100);
    this.paymentInfo.currency = "BRL";
    this.paymentInfo.receiptEmail = purchase.cliente.email

    if (!this.checkoutFormGroup.invalid && this.displayError.textContent == "") {
      this.desativarBotao = true
      this.checkoutService.createPaymentIntent(this.paymentInfo).subscribe(
        (response) => {
          this.stripe.confirmCardPayment(response.client_secret, {
            payment_method: {
              card: this.cardElement,
              billing_details:{
                email: purchase.cliente.email,
                name: `${purchase.cliente.primeiroNome} ${purchase.cliente.ultimoNome}`,
                address:{
                  line1: purchase.address.rua,
                  city: purchase.address.cidade,
                  state: purchase.address.estado,
                  postal_code: purchase.address.codigoPostal,
                  country: code
                }
              }

            }
          }, { handleActions: false }).then((result: any) => {
            if (result.error) {
              this.desativarBotao = false;
              alert(`erro no pagamento: ${result.error.message}`)
            } else {
              this.checkoutService.placeOrder(purchase).subscribe({
                next: (response: any) => {
                  alert(`seu numero de rastreio ${response.orderTrackingNumber}`);
                  this.desativarBotao = false;
                  this.resetCart()
                },
                error: (err: any) => {
                  alert(`não foi possivel armazenar ${err.message}`)
                  this.desativarBotao = false;
                }
              });
            }
          });
        }
      );
    }else{
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }

  }

  resetCart() {
    // reset cart data
    this.cartService.carItem = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);

    localStorage.setItem('cart', '');
    this.cartService.calcularSomaDosProdutos()

    this.router.navigate(['products']);
    // reset the form
    this.checkoutFormGroup.reset();
    // navigate back to the products page

  }

  handleMonthsAndYears() {

    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup!.value.expirationYear);

    // if the current year equals the selected year, then start with the current month

    let startMonth: number;

    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    }
    else {
      startMonth = 1;
    }

    this.checkoutService.getCartaoDeCreditoMeses(startMonth).subscribe(
      data => {
        console.log("Retrieved credit card months: " + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    );
  }

  getStates(formGroupName: string) {

    const formGroup = this.checkoutFormGroup.get(formGroupName);

    const countryCode = formGroup!.value.pais.code
    const countryName = formGroup!.value.pais.name;

    this.checkoutService.getEstados(countryCode).subscribe(
      data => {

        if (formGroupName === 'shippingAddress') {
          this.shippingAddressStates = data._embedded.states;
        }
        // select first item by default
        formGroup!.get('estado')!.setValue(data._embedded.states);
      }
    );
  }

}
