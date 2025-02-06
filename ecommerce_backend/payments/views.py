from django.shortcuts import render, redirect
from django.views.generic import View
from .models import Order, OrderItem

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