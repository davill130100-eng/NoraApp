from datetime import datetime
from django.utils.timezone import  localtime, now, make_aware


def verify(model:object):
    '''
    - Valida la existencia de un registro para el dia actual desde 00.00 hasta 11.59.
    '''
    today = localtime(now()).date()
    starts_hour = make_aware(datetime.combine(today, datetime.min.time()))  # 00:00:00
    ends_hour = make_aware(datetime.combine(today, datetime.max.time()))    # 23:59:59
    exists = model.objects.filter(creado_en__range=(starts_hour, ends_hour)).exists()

    return exists