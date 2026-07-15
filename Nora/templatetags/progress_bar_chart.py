from django import template

register = template.Library()

@register.inclusion_tag("components\index\progress_bar_chart_component.html")

def progress_bar_chart(**kwargs):
    """
    Componente reutilizable para barras de progreso.

    Parámetros soportados:
    - label
    - value
    - text_class
    - border_class
    - progress_class
    """

    defaults = {
        "label": "",
        "value": 0,
        "text_class": "text-light",
        "border_class": "border-success",
        "progress_class": "text-bg-success",
    }

    defaults.update(kwargs)

    return defaults