using System.Collections.Generic;

namespace Catalog.Domain.Data
{
    public interface ICatalogRepository
    {
        IEnumerable<CatalogPolicy> Get();
        void Add(CatalogPolicy policy);
        void Update(CatalogPolicy policy);
        void Remove(int policyNumber);
        CatalogPolicy Get(int policyNumber);
    }
}