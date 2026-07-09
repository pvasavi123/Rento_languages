import jwt
from django.conf import settings
from django.http import JsonResponse
from HAC.models import Owners

class OwnerAccountMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        auth_header = request.headers.get('Authorization')
        account_id = request.headers.get('X-Owner-Account-ID')
        
        request.owner_account = None

        if auth_header and auth_header.startswith('Bearer '):
            token = auth_header.split(' ')[1]
            try:
                # We decode using django secret key, without verification (letting jwt_required decorator do validation)
                payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
                role = payload.get('role')
                phone = payload.get('phone')

                if role == 'owner' and phone:
                    if account_id:
                        account_id = account_id.strip()
                        if account_id and account_id != 'null' and account_id != 'undefined':
                            account = Owners.objects.filter(pk=account_id).first()
                            if account:
                                if account.phone == phone:
                                    request.owner_account = account
                                else:
                                    return JsonResponse(
                                        {'error': 'Unauthorized account access. Account does not match authenticated phone.'},
                                        status=403
                                    )
                    
                    if not request.owner_account:
                        user_id = payload.get('user_id')
                        if user_id:
                            request.owner_account = Owners.objects.filter(pk=user_id).first()
                        if not request.owner_account:
                            default_account = Owners.objects.filter(phone=phone).order_by('created_at').first()
                            request.owner_account = default_account
            except Exception:
                pass

        response = self.get_response(request)
        return response
