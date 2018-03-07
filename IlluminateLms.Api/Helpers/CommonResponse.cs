namespace IlluminateLms.Api.Helpers
{
    public class CommonResponse
    {
        public string Status { get; set; }
        public object Data { get; set; }

        /// <summary>
        /// Send success message
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static CommonResponse Success(object data)
        {
            return new CommonResponse
            {
                Status = "Success",
                Data = data
            };
        }
        
        /// <summary>
        /// Send fail message
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static CommonResponse Fail(object data)
        {
            return new CommonResponse
            {
                Status = "Fail",
                Data = data
            };
        }
    }
}