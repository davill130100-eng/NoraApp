from datetime import datetime, time
from django.db.models import Sum
from django.utils import timezone

def calculate(modelo, campo_fecha, campo_valor, campo_estado, estados):
    """
    Calcula el porcentaje de ventas por estado sobre el total del día actual.

    :param modelo: Modelo (Pedido)
    :param campo_fecha: Campo datetime (ej: 'creado_en')
    :param campo_valor: Campo numérico (ej: 'total_pedido')
    :param campo_estado: Campo estado (ej: 'estado_pedido')
    :param estados: Lista de estados a evaluar (ej: [2,3,4])
    :return: dict {estado: porcentaje}
    """

    ahora = timezone.now()

    inicio_dia = datetime.combine(ahora.date(), time.min)
    fin_dia = datetime.combine(ahora.date(), time.max)

    inicio_dia = timezone.make_aware(inicio_dia)
    fin_dia = timezone.make_aware(fin_dia)

    # Total general del día
    total_general = modelo.objects.filter(
        **{f"{campo_fecha}__range": (inicio_dia, fin_dia)}
    ).aggregate(total=Sum(campo_valor))["total"] or 0

    resultados = {}

    if total_general == 0:
        # Evitar división por cero
        for estado in estados:
            resultados[estado] = 0
        return resultados

    # Calcular por cada estado
    for estado in estados:
        total_estado = modelo.objects.filter(
            **{
                f"{campo_fecha}__range": (inicio_dia, fin_dia),
                campo_estado: estado
            }
        ).aggregate(total=Sum(campo_valor))["total"] or 0

        porcentaje = (total_estado / total_general) * 100
        resultados[estado] = round(porcentaje, 2)

    return resultados