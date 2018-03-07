using System.IO;
using System.Linq;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;

namespace IlluminateLms.Api.Helpers
{
    /// <summary>
    /// 
    /// </summary>
    public class ApiExceptionFilter : ExceptionFilterAttribute
    {
        /// <summary>
        /// 
        /// </summary>
        private readonly ILogger<ApiExceptionFilter> _logger;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="logger"></param>
        public ApiExceptionFilter(ILogger<ApiExceptionFilter> logger)
        {
            _logger = logger;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="context"></param>
        public override void OnException(ExceptionContext context)
        {

            // always return a JSON result
            //context.Result = new JsonResult(apiError);
            context.HttpContext.Response.StatusCode = 500;
            context.Result = new JsonResult(CommonResponse.Fail(context.Exception.Message));

            WriteToLog(context);
            base.OnException(context);
        }

        private void WriteToLog(ExceptionContext context)
        {
            var req = context.HttpContext.Request;
            req.Body.Position = 0;
            string content;
            using (StreamReader reader
                = new StreamReader(req.Body, Encoding.UTF8, true, 1024, true))
            {
                content = reader.ReadToEnd();
            }
            req.Body.Position = 0;

//            var claims = string.Join("\r\n", context.HttpContext.User.Claims.Select(c => $"{c.Type}={c.Value}"));

            var str = string.Format("{2}Path: {4}; {5}{2}Content: {2}{0}{2}User:{1}{2}Claims:{2}{3}", content, context.HttpContext.User.Identity.Name, "\r\n\r\n", null, req.Path, req.Method);
            _logger.LogError(0, context.Exception, str);
        }
    }
}