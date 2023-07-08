namespace yourscope_api.entities
{
    public class ApiResponse
    {
        public int StatusCode { get; set; }
        public object? Data { get; set; }
        public IEnumerable<string>? Errors { get; set; }
        public string? Message { get; set; }
        public bool? Successful { get; set; }
        public Exception? Exception { get; set; }

        #region constructors
        public ApiResponse(int statusCode, string? message = null, object? data = null, bool? success = null, IEnumerable<string>? errors = null, Exception? exception = null)
        {
            this.StatusCode = statusCode;
            this.Data = data;
            this.Message = message;
            this.Errors = errors;
            this.Successful = success;
            this.Exception = exception;
        }
        #endregion
    }
}
