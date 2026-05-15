from datetime import datetime
from django.utils.timezone import  localtime, now, make_aware
from django.shortcuts import redirect
from functools import wraps
from .models import Base

def base_today_required(vista_func):
    @wraps(vista_func)
    def _wrapped_view(request, *args, **kwargs):
        if not request.user.is_authenticated:
            return redirect('login')

        today = localtime(now()).date()
        start_date = make_aware(datetime.combine(today, datetime.min.time()))  # 00:00:00
        end_date = make_aware(datetime.combine(today, datetime.max.time()))    # 23:59:59
        existe = Base.objects.filter(
            creado_en__range=(start_date, end_date)
        ).exists()

        if not existe:
            return redirect('agregar_base')

        return vista_func(request, *args, **kwargs)

    return _wrapped_view