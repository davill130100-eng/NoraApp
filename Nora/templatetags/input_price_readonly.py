from django import template

register = template.Library()

@register.inclusion_tag("components\index\input_price_readonly.html")

def input_price_readonly(**kwargs):
    """
    Componente reutilizable para campos de entrada de precio de solo lectura.

    Parámetros soportados:
    - value
    - bg_border_class
    """

    defaults = {
        "value": 0,
        "bg_border_class": "bg-success-subtle border-success",
    }

    defaults.update(kwargs)

    return defaults