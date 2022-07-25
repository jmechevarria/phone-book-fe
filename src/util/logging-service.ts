/**
 * Utility function to log details from axios errors.
 *
 * @param {Error} error
 * @param {string} prefix
 */
export const logAxiosError = (error: any, prefix = "") => {
  if (error.isAxiosError) {
    const details: any = {};
    const { config, response } = error;

    details.method = config.method;
    details.url = config.url;
    details.requestData = config.data;
    details.requestParams = config.params;
    details.requestHeaders = config.headers;

    if (response) {
      details.status = response.status;
      details.errorData = response.data;
    } else {
      details.errorCode = error.code;
      details.errorMessage = error.message;
    }

    console.error(prefix, details);
  } else console.error(prefix, error);
};
