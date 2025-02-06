from django.shortcuts import render, redirect
from django.views.generic import View
from .models import Order, OrderItem
import json
import stripe
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import requests

stripe.api_key = settings.STRIPE_SECRET_KEY

class PaymentView(View):
    template_name = 'src/templates/payment.html'
    
    def get(self, request, *args, **kwargs):
        # Aktif sepeti al
        cart = request.user.cart
        cart_items = cart.items.all()
        
        # Sipariş özetini hesapla
        subtotal = sum(item.get_total_price() for item in cart_items)
        shipping_cost = 29.99  # Sabit kargo ücreti
        total = subtotal + shipping_cost
        
        context = {
            'cart_items': cart_items,
            'subtotal': subtotal,
            'shipping_cost': shipping_cost,
            'total': total,
        }
        
        return render(request, self.template_name, context)
    
    def post(self, request, *args, **kwargs):
        # Form verilerini al
        first_name = request.POST.get('firstName')
        last_name = request.POST.get('lastName')
        email = request.POST.get('email')
        phone = request.POST.get('phone')
        address = request.POST.get('address')
        order_note = request.POST.get('orderNote')
        payment_method = request.POST.get('payment')
        
        # Yeni sipariş oluştur
        order = Order.objects.create(
            user=request.user,
            first_name=first_name,
            last_name=last_name,
            email=email,
            phone=phone,
            address=address,
            order_note=order_note,
            payment_method=payment_method,
        )
        
        # Sepetteki ürünleri siparişe ekle
        cart_items = request.user.cart.items.all()
        for item in cart_items:
            OrderItem.objects.create(
                order=order,
                product=item.product,
                quantity=item.quantity,
                price=item.product.price
            )
        
        # Sepeti temizle
        request.user.cart.items.all().delete()
        
        # Ödeme sayfasına yönlendir
        return redirect('payment_success')

@csrf_exempt
@require_http_methods(["POST"])
def stripe_payment(request):
    try:
        # Request body'sini logla
        print("Stripe Request Body:", request.body)
        
        data = json.loads(request.body)
        amount = int(float(data['amount']) * 100)  # Convert to cents
        
        print("Stripe Amount:", amount)  # Amount'u logla
        
        # Stripe ödeme oturumu oluştur
        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price_data': {
                    'currency': 'usd',
                    'unit_amount': amount,
                    'product_data': {
                        'name': 'Sipariş Ödemesi',
                    },
                },
                'quantity': 1,
            }],
            mode='payment',
            success_url='http://localhost:3000/payment/success',
            cancel_url='http://localhost:3000/payment/cancel',
        )
        
        return JsonResponse({
            'status': 'success',
            'redirect_url': session.url
        })
    except Exception as e:
        print("Stripe Error:", str(e))  # Hatayı logla
        return JsonResponse({
            'status': 'error',
            'message': str(e)
        }, status=400)

@csrf_exempt
@require_http_methods(["POST"])
def paypal_payment(request):
    try:
        # Request body'sini logla
        print("PayPal Request Body:", request.body)
        
        # Request body'den veriyi al
        data = json.loads(request.body)
        
        # Amount'u doğru formatta al ve kontrol et
        try:
            amount = float(data['amount'])
            if amount <= 0:
                raise ValueError("Amount must be greater than 0")
            amount = "{:.2f}".format(amount)  # İki ondalık basamağa formatla
        except (ValueError, TypeError) as e:
            raise Exception(f"Invalid amount value: {str(e)}")
            
        print("PayPal Amount:", amount)  # Amount'u logla
        
        # PayPal API endpoint'leri
        PAYPAL_API_URL = "https://api-m.sandbox.paypal.com"
        
        # Access token al
        auth_response = requests.post(
            f"{PAYPAL_API_URL}/v1/oauth2/token",
            auth=(settings.PAYPAL_CLIENT_ID, settings.PAYPAL_CLIENT_SECRET),
            headers={'Accept': 'application/json', 'Accept-Language': 'en_US'},
            data={'grant_type': 'client_credentials'}
        )
        
        print("PayPal Auth Response:", auth_response.text)
        
        if not auth_response.ok:
            print("PayPal Auth Error:", auth_response.json())
            raise Exception("PayPal authentication failed")
            
        access_token = auth_response.json()['access_token']
        
        # PayPal order oluştur
        headers = {
            'Authorization': f'Bearer {access_token}',
            'Content-Type': 'application/json',
            'Prefer': 'return=representation'
        }
        
        order_data = {
            'intent': 'CAPTURE',
            'purchase_units': [{
                'amount': {
                    'currency_code': 'USD',
                    'value': amount
                },
                'description': 'E-commerce Purchase'
            }],
            'application_context': {
                'brand_name': 'Your Store Name',
                'landing_page': 'LOGIN',
                'user_action': 'PAY_NOW',
                'return_url': 'http://localhost:3000/payment/success',
                'cancel_url': 'http://localhost:3000/payment/cancel'
            }
        }
        
        print("PayPal Order Request:", order_data)
        
        response = requests.post(
            f"{PAYPAL_API_URL}/v2/checkout/orders",
            headers=headers,
            json=order_data
        )
        
        print("PayPal Order Response:", response.text)
        
        if not response.ok:
            error_data = response.json()
            print("PayPal Order Error:", error_data)
            raise Exception(f"PayPal order creation failed: {error_data.get('message', 'Unknown error')}")
            
        order = response.json()
        
        # Approve URL'i bul
        approve_url = next(link['href'] for link in order['links'] if link['rel'] == 'approve')
        
        return JsonResponse({
            'status': 'success',
            'redirect_url': approve_url
        })
        
    except Exception as e:
        print("PayPal Error:", str(e))
        return JsonResponse({
            'status': 'error',
            'message': str(e)
        }, status=400)

def index(request):
    return JsonResponse({
        'status': 'success',
        'message': 'E-commerce API is running',
        'endpoints': {
            'admin': '/admin/',
            'stripe_payment': '/api/stripe-payment/',
            'paypal_payment': '/api/paypal-payment/'
        }
    }) 