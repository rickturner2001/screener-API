
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import WatchlistSerializer
from base.api.market_data.api_requests import general_market_data_request
from django.contrib.auth.models import User
from .serializers import RegisterSerializer
from rest_framework import generics
from rest_framework.permissions import AllowAny
import pandas as pd
from base.api.market_data.config import file_path


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def update(self, instance, validated_data):
        pass

    def create(self, validated_data):
        pass

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


@api_view(['GET'])
def get_routes(request):
    routes = [
        "api/token",
        "api/token/refresh",
    ]

    return Response(routes)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_watchlists(request):
    user = request.user
    watchlists = user.watchlist_set.all()
    serializer = WatchlistSerializer(watchlists, many=True)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_watchlists(request):
    # user = request.user
    # watchlists = user.watchlist_set.all()
    serializer = WatchlistSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        print(Response(serializer.data))
        return Response(serializer.data)

    # return Response({"status": "Success"})


@api_view(["GET"])
# @permission_classes([IsAuthenticated])
def get_general_market_data(request):
    return Response(general_market_data_request())


@api_view(["GET"])
def tickers_info(request):
    df = pd.read_csv(file_path / "sp500.csv")
    tickers = df['Symbol'].values
    securities = df['Security'].values
    sec_filings = df['SEC filings']
    sectors = df['GICS Sector']
    sub_industries = df['GICS Sub-Industry']
    headquarters = df['Headquarters Location']
    return Response({
       ticker: {
           "security": securities[i],
           "sec_filings": sec_filings[i],
           "sector": sectors[i],
           "sub_industry": sub_industries[i],
           "headquarter": headquarters[i]
       } for i, ticker in enumerate(tickers)
    })

