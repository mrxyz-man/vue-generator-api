// TODO: add config with many error statuses and messages;
// TODO: maybe add extend default error statuses with data;

const HTTP_ERRORS = {
  response_undefined: 0,
  bad_request: 400,
  unauthorized: 401,
  not_found: 404,
  unknown_error: 520,
};

// https://yandex.ru/support/webmaster/error-dictionary/http-codes.html
const ERROR_MESSAGES = {
  [HTTP_ERRORS.response_undefined]: 'Структура запроса не найдена/Response Undefined',
  [HTTP_ERRORS.bad_request]: 'Неверный запрос/Bad Request',
  [HTTP_ERRORS.unauthorized]: 'Неавторизованный запрос/Unauthorized',
  [HTTP_ERRORS.not_found]: 'Ресурс не найден/Not Found',
  [HTTP_ERRORS.unknown_error]: 'Неизвестная ошибка/Unknown Error',
};

const DEFAULT_CALLBACKS = {
  onError: ({ messages }) => {
    messages.forEach((message) => {
      console.error(message);
    });
  },
};

const initCallbacks = (callbacks, args) => {
  Object.keys(callbacks).forEach((key) => {
    callbacks[key]({ ...args });
  });
};

export default (error, options) => {
  let errors = {};
  const { response } = error;
  const callbacks = {
    ...DEFAULT_CALLBACKS,
    ...options?.callbacks || {},
  };

  // Если есть структура запроса
  if (response) {
    const { data } = response;
    errors = { ...data.errors || data.validation };

    // Если нет словаря с ошибками, то добавить ошибки
    // со статусом ввиде сообщения
    if (!Object.keys(errors).length) {
      const status = data.status || HTTP_ERRORS.unknown_error;
      const message = (
        data.data?.message
        || data.message
        || data.result_message
        || ERROR_MESSAGES[status]
      );
      errors[status] = message;
    }
  } else {
    // Иначе, записать сообщение об отсутствии запроса
    const status = HTTP_ERRORS.response_undefined;
    const message = ERROR_MESSAGES[status];
    errors[status] = message;
  }

  const messages = Object.values(errors);

  initCallbacks(callbacks, { error, errors, messages });

  return Promise.reject(error);
};
