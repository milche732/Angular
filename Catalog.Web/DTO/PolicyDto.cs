using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Catalog.Web.DTO
{
    /// <summary>
    /// DTO version of Policy object, will be used to transfer object to client side
    /// </summary>
    public class PolicyDto
    {
        [Required]
        public int PolicyNumber { get; set; }
        [Required]
        public string Name { get; set; }
        [Range(0, 120)]
        public int Age { get; set; }
        [Range(0, 1)]
        public int Gender { get; set; }
    }
}
