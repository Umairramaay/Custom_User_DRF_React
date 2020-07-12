from allauth.account.adapter import get_adapter
from rest_auth.registration.serializers import RegisterSerializer
from rest_framework import serializers
from rest_framework.authtoken.models import Token

from .models import User,Employee,Customer


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'username', 'password','is_customer', 'is_employee','first_name','last_name')



# default=True
class CustomRegisterSerializer(RegisterSerializer):
    is_customer = serializers.BooleanField()
    is_employee = serializers.BooleanField()
    first_name=serializers.CharField(max_length=20,required=True)
    last_name=serializers.CharField(max_length=20,required=True)

    class Meta:
        model = User
        fields = ('email', 'username', 'password','is_customer', 'is_employee','first_name','last_name')

    def get_cleaned_data(self):
        return {
            'username': self.validated_data.get('username', ''),
            'password': self.validated_data.get('password', ''),
            'email': self.validated_data.get('email', ''),
            'is_customer': self.validated_data.get('is_customer', ''),
            'is_employee': self.validated_data.get('is_employee', ''),
            'first_name': self.validated_data.get('first_name', ''),
            'last_name': self.validated_data.get('last_name', ''),
        }

    def save(self, request):
        data=request.data
        print(data)
        adapter = get_adapter()
        user = adapter.new_user(request)
        self.cleaned_data = self.get_cleaned_data()
        user.is_customer = self.cleaned_data.get('is_customer')
        user.is_employee = self.cleaned_data.get('is_employee')
        user.save()
        if user.is_customer:
            customer = Customer.objects.create(user=user)
            customer.phone_number=data['phone_number']
            customer.location=data['location']
            customer.save()
        elif user.is_employee:
            employee = Employee.objects.create(user=user)
            employee.phone_number=data['phone_number']
            employee.designation=data['designation']
            employee.save()
        adapter.save_user(request, user, self)
        return user



# class TokenSerializer(serializers.ModelSerializer):
#     user_type = serializers.SerializerMethodField()

#     class Meta:
#         model = Token
#         fields = ('key', 'user', 'user_type')

#     def get_user_type(self, obj):
#         serializer_data = UserSerializer(
#             obj.user
#         ).data
#         is_student = serializer_data.get('is_student')
#         is_teacher = serializer_data.get('is_teacher')
#         return {
#             'is_student': is_student,
#             'is_teacher': is_teacher
#         }