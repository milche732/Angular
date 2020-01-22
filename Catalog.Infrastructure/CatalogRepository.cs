using Catalog.Domain.Data;
using System.Collections.Generic;
using System.Linq;

namespace Catalog.Infrastructure
{
    public class CatalogRepository : ICatalogRepository
    {
        private readonly IList<CatalogPolicy> _policies;

        public CatalogRepository()
        {
            _policies = new List<CatalogPolicy>
            {
                new CatalogPolicy
                {
                    Number = 7349562,
                    Holder = _policyHolder1
                },
                new CatalogPolicy
                {
                    Number = 3834002,
                    Holder = _policyHolder1
                },
                new CatalogPolicy
                {
                    Number = 4629446,
                    Holder = _policyHolder2
                },
                new CatalogPolicy
                {
                    Number = 3556749,
                    Holder = _policyHolder3
                },
                new CatalogPolicy
                {
                    Number = 5898814,
                    Holder = _policyHolder3
                },
                new CatalogPolicy
                {
                    Number = 9982546,
                    Holder = _policyHolder3
                },
                new CatalogPolicy
                {
                    Number = 1003744,
                    Holder = _policyHolder3
                }
            };
        }

        public IEnumerable<CatalogPolicy> Get()
        {
            return _policies;
        }

        public void Add(CatalogPolicy policy)
        {
            _policies.Add(policy);
        }

        public void Update(CatalogPolicy policy)
        {
            Remove(policy.Number);
            _policies.Add(policy);
        }

        public void Remove(int policyNumber)
        {
            var policy = _policies.SingleOrDefault(p => p.Number == policyNumber);

            if (policy != null)
                _policies.Remove(policy);
        }

        public CatalogPolicy Get(int policyNumber)
        {
            return _policies.SingleOrDefault(p => p.Number == policyNumber);
        }

        private readonly CatalogHolder _policyHolder1 = new CatalogHolder
        {
            Name = "Dwwayne Joohnson",
            Age = 44,
            Gender = Gender.Male
        };

        private readonly CatalogHolder _policyHolder2 = new CatalogHolder
        {
            Name = "J1ohn Cena",
            Age = 38,
            Gender = Gender.Male
        };

        private readonly CatalogHolder _policyHolder3 = new CatalogHolder
        {
            Name = "Tgrish Sbtratus",
            Age = 42,
            Gender = Gender.Female
        };
    }
}