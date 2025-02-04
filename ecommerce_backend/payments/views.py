from django.shortcuts import render

# Create your views here.
import paypalrestsdk
from django.conf import settings
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import stripe
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import json
import traceback

paypalrestsdk.configure({
    "mode": settings.PAYPAL_MODE,
    "client_id": settings.PAYPAL_CLIENT_ID,
    "client_secret": settings.PAYPAL_CLIENT_SECRET,
})

# Configure Stripe with your secret key
stripe.api_key = settings.STRIPE_SECRET_KEY

@csrf_exempt
@api_view(['POST'])
def stripe_payment(request):
    print("\n=== New Stripe Request ===")
    print(f"Request Method: {request.method}")
    print(f"Request Body: {request.body.decode('utf-8')}")
    
    try:
        amount = request.data.get('amount')
        currency = request.data.get('currency', 'USD')
        
        if not amount:
            return Response({
                'error': 'Amount is required',
                'received_data': request.data
            }, status=status.HTTP_400_BAD_REQUEST)

        # Create Stripe Checkout Session
        checkout_session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price_data': {
                    'currency': currency,
                    'unit_amount': int(float(amount) * 100),  # Convert to cents
                    'product_data': {
                        'name': 'Payment',
                    },
                },
                'quantity': 1,
            }],
            mode='payment',
            success_url='http://localhost:3000/success',
            cancel_url='http://localhost:3000/cancel',
        )
        
        return Response({
            'redirect_url': checkout_session.url
        })
        
    except stripe.error.StripeError as e:
        print(f"Stripe error: {str(e)}")
        return Response({
            'error': str(e)
        }, status=status.HTTP_400_BAD_REQUEST)
        
    except Exception as e:
        print(f"Error in stripe_payment: {str(e)}")
        return Response({
            'error': str(e)
        }, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@require_http_methods(["POST"])
def paypal_payment(request):
    print("\n=== New Request ===")
    print(f"Request Method: {request.method}")
    print(f"Request Path: {request.path}")
    
    try:
        # Parse the request body
        data = json.loads(request.body)
        print("Received data:", data)
        
        amount = data.get('amount')
        currency = data.get('currency', 'USD')
        
        if not amount:
            return JsonResponse({
                'error': 'Amount is required',
                'received_data': data
            }, status=400)
            
        # Initialize PayPal payment
        payment = paypalrestsdk.Payment({
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "transactions": [{
                "amount": {
                    "total": str(amount),
                    "currency": currency
                },
                "description": "Payment description"
            }],
            "redirect_urls": {
                "return_url": "http://localhost:3000/success",
                "cancel_url": "http://localhost:3000/cancel"
            }
        })

        if payment.create():
            # Get approval URL
            for link in payment.links:
                if link.method == "REDIRECT":
                    redirect_url = link.href
                    return JsonResponse({'redirect_url': redirect_url})
            
            return JsonResponse({
                'error': 'No redirect URL found'
            }, status=400)
        else:
            print("Payment creation failed:", payment.error)
            return JsonResponse({
                'error': 'Payment creation failed',
                'details': payment.error
            }, status=400)
            
    except json.JSONDecodeError as e:
        print("JSON Decode Error:", str(e))
        print("Raw request body:", request.body)
        return JsonResponse({
            'error': 'Invalid JSON data',
            'details': str(e)
        }, status=400)
        
    except Exception as e:
        print("Unexpected error:", str(e))
        print("Traceback:", traceback.format_exc())
        return JsonResponse({
            'error': 'Server error',
            'details': str(e)
        }, status=500)