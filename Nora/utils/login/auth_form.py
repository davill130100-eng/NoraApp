from django.contrib.auth.forms import AuthenticationForm

class CustomAuthenticationForm(AuthenticationForm):
    error_messages = {
        "invalid_login": "Nombre de usuario y clave incorrectos.",
        "inactive": "Esta cuenta está inactiva.",
    }