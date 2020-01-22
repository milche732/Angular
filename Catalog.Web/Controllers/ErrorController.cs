using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Catalog.Web.Controllers
{
    [Route("api/[controller]")]
    public class ErrorController : Controller
    {
        [Route("")]
        [AllowAnonymous]
        public IActionResult Get()
        {
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }
}
