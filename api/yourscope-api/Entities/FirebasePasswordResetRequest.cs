namespace yourscope_api.entities
{
    public class FirebasePasswordResetRequest
    {
        public readonly string RequestType = "PASSWORD_RESET";
        public required string Email { get; set; }
    }
}
