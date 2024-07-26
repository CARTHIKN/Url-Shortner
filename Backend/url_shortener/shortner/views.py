# shortener/views.py
import string
import random
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import redirect, get_object_or_404
from .models import URL
from .serializers import URLSerializer
from rest_framework.views import APIView

class ShortenUrlApi(APIView):
    def post(self, request, *args, **kwargs):
        
        serializer = URLSerializer(data=request.data)
        if serializer.is_valid():
            original_url = serializer.validated_data['original_url']
            short_url = self.generate_short_url()  
            print(short_url)
            url, created = URL.objects.get_or_create(original_url=original_url, defaults={'short_url': short_url})
            print(url.short_url)
            return Response({'short_url': url.short_url}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def generate_short_url(self, length=5):
        characters = string.digits + string.ascii_letters
        return ''.join(random.choice(characters) for _ in range(length))


def redirect_url(request, short_url):
    url = get_object_or_404(URL, short_url=short_url)

    return redirect(url.original_url)
