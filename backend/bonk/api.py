from django.urls import path
from django.http.response import JsonResponse


def me(request, *args, **kwargs):
    if request.user.is_authenticated:
        return JsonResponse(
            {
                "username": request.user.username,
                "display_name": request.user.display_name,
                "id": request.user.id,
            }
        )
    return JsonResponse(
        {
            "error": "You need to be logged in",
        },
        status=401,
    )


urls = [
    path("me", me),
]
