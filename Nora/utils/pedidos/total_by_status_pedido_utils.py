from datetime import datetime, time
from django.db.models import Sum
from django.utils import timezone


def calculate(
    modelo,
    campo_fecha,
    campo_valor,
    campo_estado,
    estados
):
    """
    Retorna los totales acumulados por estado del día actual.

    Parámetros:
        modelo: Modelo de Django a consultar.
        campo_fecha (str): Nombre del campo datetime.
            Ejemplo: 'creado_en'

        campo_valor (str): Nombre del campo numérico a sumar.
            Ejemplo: 'total_pedido'

        campo_estado (str): Nombre del campo estado.
            Ejemplo: 'estado_pedido'

        estados (list): Lista de estados a evaluar.
            Ejemplo: [2, 3, 4]

    Retorna:
        dict: {
            estado: total
        }

    Ejemplo:
        {
            2: 150000,
            3: 98000,
            4: 45000
        }
    """

    ahora = timezone.now()

    inicio_dia = timezone.make_aware(
        datetime.combine(ahora.date(), time.min)
    )

    fin_dia = timezone.make_aware(
        datetime.combine(ahora.date(), time.max)
    )

    resultados = {}

    for estado in estados:
        total_estado = modelo.objects.filter(
            **{
                f"{campo_fecha}__range": (inicio_dia, fin_dia),
                campo_estado: estado
            }
        ).aggregate(
            total=Sum(campo_valor)
        )["total"] or 0

        resultados[estado] = total_estado

    return resultados