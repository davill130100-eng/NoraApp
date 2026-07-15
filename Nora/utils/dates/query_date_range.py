from datetime import datetime, timedelta

def calc(query_config : dict = {}):
    '''
    Obtiene los registros coincidentes en el rango de fecha asignado.

    Args:
        dict:
            query_config: Diccionario con la configuracion del rango de fechas y registros.
    
    Returns:
        dict:
            Registros filtrados por el rango.

    Raises:
        ValueError: Si la configuracion del diccionario no es valida.
    '''
    if not query_config:
        raise ValueError(
            "query_date_range.calc: Se requiere un diccionario con los argumentos validos"
        )

    if not query_config.get('start') or not query_config.get('end'):
        raise ValueError(
            "query_date_range.calc: Se requieren fecha inicial y fecha final"
        )

    starts_at = datetime.strptime(query_config['start'], '%Y-%m-%d')
    end_at = (
        datetime.strptime(query_config['end'], '%Y-%m-%d')
        + timedelta(days=1)
        - timedelta(seconds=1)
    )

    return query_config['data'].filter(
        creado_en__range=[starts_at, end_at]
    )
