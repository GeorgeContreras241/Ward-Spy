export const handleApiError = (error) => {
  if (!error || !error.response) {
    return 'Error de conexión. Por favor, verifica tu conexión a internet.';
  }

  const { status, data } = error.response;
  
  switch (status) {
    case 400:
      return data.message || 'Upps Ha ocurrido un error inesperado.';
    case 401:
      return 'Upps la api key no es valida.';
    case 403:
      return 'Acceso denegado.';
    case 404:
      return 'Upps no se encontro';
    case 408:
      return 'Tiempo de espera agotado. Por favor, inténtalo de nuevo.';
    case 429:
      return 'Demasiadas solicitudes. Por favor, espera un momento antes de intentar nuevamente.';
    case 500:
      return 'Error interno del servidor. Por favor, inténtalo más tarde.';
    case 503:
      return 'Servicio no disponible temporalmente. Por favor, inténtalo más tarde.';
    default:
      return data.message || 'Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo.';
  }
};

export const isClientError = (status) => {
  return status >= 400 && status < 500;
};

export const isServerError = (status) => {
  return status >= 500;
};
