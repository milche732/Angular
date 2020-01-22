using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Design;
using Catalog.Domain.Data;
using Catalog.Web.DTO;

namespace Catalog.Web.Controllers
{
    [Route("api/[controller]")]
    public class PolicyController : Controller
    {
        private readonly ICatalogRepository _policyRepository;

        public PolicyController(ICatalogRepository policyRepository)
        {
            _policyRepository = policyRepository;
        }


        //TODO add methods to get/create/update/delete data from _repository
        public IActionResult Get()
        {
            return Ok(_policyRepository.Get().OrderBy(x=>x.Number).Select(x=>x.ToDto()));
        }

        [HttpGet("{policyNumber}")]
        public IActionResult Get(int policyNumber)
        {
            CatalogPolicy policy = _policyRepository.Get(policyNumber);
            if (policy == null)
                return NotFound();
            return Ok(policy.ToDto());
        }

        [HttpGet]
        [Route("check/{policyNumber}")]
        public IActionResult Check(int policyNumber)
        {
            bool res = _policyRepository.Get(policyNumber) == null;
            return Ok(res);
        }

        [HttpPut()]
        public IActionResult CreatePolicy([FromBody]PolicyDto dto)
        {
            if (!this.ModelState.IsValid)
                return BadRequest();

            CatalogPolicy policy = dto.ToPolicy();

            if (_policyRepository.Get(policy.Number) != null)
                return Conflict();

            _policyRepository.Add(policy);

            CatalogPolicy p = _policyRepository.Get(policy.Number);
            return Ok(p.ToDto());
        }

        [HttpPost()]
        public IActionResult UpdatePolicy([FromBody]PolicyDto dto)
        {
            if (!this.ModelState.IsValid)
                return BadRequest();

            CatalogPolicy policy = dto.ToPolicy();

            if (_policyRepository.Get(policy.Number) == null)
                return NotFound();

            _policyRepository.Update(policy);

            CatalogPolicy p = _policyRepository.Get(policy.Number);
            return Ok(p.ToDto());
        }

        [HttpDelete("{policyNumber}")]
        public IActionResult DeletePolicy(int policyNumber)
        {
            if (_policyRepository.Get(policyNumber) == null)
                return NotFound(false);

            _policyRepository.Remove(policyNumber);

            return Ok();
        }
    }
}
