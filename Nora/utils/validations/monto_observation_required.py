def verify (
        monto: str, 
        observacion: str, 
        zero_or_less: bool = False,
        observation_optional: bool = False
    ):
    '''
    Valida la coherencia de dos datos.

    Args:
        str:
            monto: Precio/valor numerico requerido.
        str:
            observacion: Concepto explicito requerido.
        bool:
            zero_or_less: Flag para validacion de monto menor o igual a 0 (default = False).
        bool:
            observation_optional: Flag para eximir la observacion como requerida (default = False).

    Returns:
        bool: True, si los datos son coherentes.

    Raises:
        ValueError: Si los datos no cumplen los filtros.

    Examples: 
        >>> monto_observation_required.verify(
            monto = precio que  sera convertido a entero y validado, 
            observacion = concepto asociado al monto,
            zero_or_less = Filtro adicional para validar si el monto es menor o igual a 0,
            observation_optional = Filtro adicional para eximir la observacion como requerida
        )
    '''
    if not monto or not monto.strip():
        raise ValueError('El monto es requerido')
    
    monto = int(monto)

    if zero_or_less:
        if monto <= 0:
            raise ValueError(f'{monto} no es un valor válido')

    if monto < 0:
        raise ValueError(f'{monto} no es un valor válido')
    
    if not observation_optional:
        
        if not observacion or not observacion.strip():
            raise ValueError('La observacion es requerida')
    
    return True