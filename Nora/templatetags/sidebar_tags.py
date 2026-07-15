from django import template
from django.urls import reverse
from django.templatetags.static import static

register = template.Library()

@register.inclusion_tag("components/sidebar/anchor_customizable_component.html", takes_context=True)
def sidebar_anchor_component(context, url_name, icon_id, data_path, title):
    request = context["request"]

    # convertir string en lista si es necesario
    if isinstance(url_name, str):
        url_names = url_name.split()
    else:
        url_names = url_name

    return {
        "request": request,
        "href": reverse(url_names[0]),  # el primero es el link principal
        "url_names": url_names,
        "icon_id": icon_id,
        "data_path": static(data_path),
        "title": title,
    }
