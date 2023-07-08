## YourScope Backend REST API Documentation
This is the documentation for the YourScope API created by Wenduo Sky. Within this document, you will find information pertaining to the nature of the API (the structure of the response body, the nature of authentication, etc) as well as documentation on each of the endpoints that are exposed through this API.

### Response Body

All exposed endpoints within the API will return a consistent object which has the following structure:

```csharp
class ApiResponse
{
    int StatusCode;
    object? Data;
    IEnumerable<string>? Errors;
    string? Message;
    bool? Successful;
    Exception? Exception;
}
```

In the response body, the above class will be serialized into a JSON format where each field will be camelCased; thus, responses will have the following structure:

```json
{
  "statusCode": 200,
  "data": /* The state of the resource */,
  "errors": /* An array of error messages */,
  "message": "Some message",
  "successful": /* A boolean */,
  "exception": /* An exception object */
}
```

Here are what each of the above fields represents, and how each endpoint will use them:

- `statusCode`: This represents the HTTP response status code indicating information about the completion or lack thereof of the request.
- `data`: This represents the state of the resource _after_ the requested operation has been applied to the resource. With respect to `GET` endpoints, this would represent the state of the resource that you are trying to access. This value will be `null` if there was any sort of problem during the request (404, 401, 500, etc). This will most likely be the field containing the bulk of the information you want to access.
- `errors`: This is a list of error messages that may help to diagnose the root cause of failures within the API.
- `message`: This is a string that may contain a meaningful message in order to indicate the status of the response in human-readable language.
- `successful`: This is a boolean representing the 'success' of a request; the definition of 'success' may differ from endpoint to endpoint. For example, the registration endpoint will return `true` for this field if registration is successful and `false` otherwise.
- `exception`: This is a JSON serialized object representing the exception that caused an error within the application, if any.

### Authentication

The YourScope API makes use of a JWT in order to perform authentication on certain endpoints. If an endpoint requires authentication, it will be mentioned in its respective entry in the list of endpoints below.

If an endpoint requires authentication, you must pass in a valid JWT in the `Authorization` header when making a request to the API. This header must be formatted as follows (must include `Bearer` as a prefix):

```http
Authorization: Bearer <token>
```

In order to obtain a JWT, you must first register and log in to an account using the respective endpoints. The log-in endpoint will then respond with a JWT that the client may then place in the header of subsequent requests to other endpoints requiring authentication.

If a request is missing the Authorization header or has an incorrectly formatted Authorization header, then the following will be returned in the response body:

```json
{
  "statusCode": 401,
  "data": null,
  "errors": null,
  "message": "Authentication failure.",
  "successful": false,
  "exception": null
}
```

### Endpoints
Please see api-endpoints.pdf for endpoint documentation.
