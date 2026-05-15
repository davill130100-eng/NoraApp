from datetime import datetime, time
from django.db.models import Sum
from django.utils import timezone

def calculate(modelo, campo_fecha, campo_valor):
    """
    Suma los valores de un campo en un modelo dentro del rango de hoy (00:00 a 23:59).

    :param modelo: Modelo de Django (por ejemplo: MiModelo)
    :param campo_fecha: Nombre del campo tipo fecha/datetime (str)
    :param campo_valor: Nombre del campo numérico a sumar (str)
    :return: Total de la suma (int/float) o 0 si no hay registros
    """

    # Obtener fecha actual con zona horaria
    ahora = timezone.now()

    # Construir inicio y fin del día
    inicio_dia = datetime.combine(ahora.date(), time.min)
    fin_dia = datetime.combine(ahora.date(), time.max)

    # Ajustar a zona horaria si es necesario
    inicio_dia = timezone.make_aware(inicio_dia, timezone.get_current_timezone())
    fin_dia = timezone.make_aware(fin_dia, timezone.get_current_timezone())

    # Filtrar y sumar
    resultado = modelo.objects.filter(
        **{
            f"{campo_fecha}__range": (inicio_dia, fin_dia)
        }
    ).aggregate(total=Sum(campo_valor))

    return resultado["total"] or 0