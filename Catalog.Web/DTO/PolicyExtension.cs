using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Catalog.Domain.Data;

namespace Catalog.Web.DTO
{
    public static class PolicyExtension
    {
        public static PolicyDto ToDto(this CatalogPolicy policy)
        {
            PolicyDto dto = new PolicyDto
            {
                PolicyNumber = policy.Number,
                Name = policy.Holder.Name,
                Age = policy.Holder.Age,
                Gender = (int)policy.Holder.Gender
            };

            return dto;
        }

        public static CatalogPolicy ToPolicy(this PolicyDto dto)
        {
            CatalogPolicy policy = new CatalogPolicy
            {
                Number = dto.PolicyNumber,
                Holder = new CatalogHolder
                {
                    Name = dto.Name,
                    Age = dto.Age,
                    Gender = (Gender)dto.Gender
                }
            };

            return policy;
        }
    }
}
