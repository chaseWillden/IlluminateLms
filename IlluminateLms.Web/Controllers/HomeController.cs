using Microsoft.AspNetCore.Mvc;

namespace IlluminateLms.Web.Controllers
{
    public class HomeController : Controller
    {
        public HomeController()
        {
            
        }

        public IActionResult Index()
        {
            if (User.Identity.IsAuthenticated)
            {
                return View();
            }
            
            return RedirectToAction("Index", "Login", null);
        }
    }
}