using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Shouldly;
using System;
using System.IO;
using System.Reflection;
using System.Threading.Tasks;
using Xunit;
using Microsoft.Extensions.Configuration;
using System.Net.Http;
using System.Text;
using System.Net;
using Catalog.Web;

namespace Catalog.Specification.Tests
{
    public class PolicySpecTests
    {
        private readonly int existingNumber = 7349562;
        private readonly int notExistingNumber = -1;
        public PolicySpecTests()
        {

        }

        [Fact]
        public async Task Get_GetAllPolicies_ReturnsSuccessResult()
        {
            var server = ConfigureServer();

            var client = server.CreateClient();

            var response = await client.GetAsync("api/policy");
            response.EnsureSuccessStatusCode();

            var responseString = await response.Content.ReadAsStringAsync();
            responseString.ShouldNotBeNull();

            server.Dispose();
        }

        [Fact]
        public async Task Get_GetPolicy_ReturnsSuccessResult()
        {
            var server = ConfigureServer();

            var client = server.CreateClient();

            var response = await client.GetAsync($"api/policy/{existingNumber}");
            response.EnsureSuccessStatusCode();

            var responseString = await response.Content.ReadAsStringAsync();
            responseString.ShouldNotBeNull();

            server.Dispose();
        }

        [Fact]
        public async Task Get_GetNotExistingPolicy_ReturnsNotFoundResult()
        {
            var server = ConfigureServer();

            var client = server.CreateClient();

            var response = await client.GetAsync($"api/policy/-1");
            response.StatusCode.ShouldBe(HttpStatusCode.NotFound);

            server.Dispose();
        }

        [Fact]
        public async Task Get_CheckNotExistingPolicy_ReturnsTrueSuccessResult()
        {
            var server = ConfigureServer();

            var client = server.CreateClient();

            var response = await client.GetAsync($"api/policy/check/{notExistingNumber}");
            response.EnsureSuccessStatusCode();

            var responseString = await response.Content.ReadAsStringAsync();
            responseString.ShouldBe("true");

            server.Dispose();
        }

        [Fact]
        public async Task Get_CheckExistingPolicy_ReturnsTrueSuccessResult()
        {
            var server = ConfigureServer();

            var client = server.CreateClient();

            var response = await client.GetAsync($"api/policy/check/{existingNumber}");
            response.EnsureSuccessStatusCode();

            var responseString = await response.Content.ReadAsStringAsync();
            responseString.ShouldBe("false");

            server.Dispose();
        }

        [Fact]
        public async Task Get_CheckExistingPolicy_ReturnsSuccessResult()
        {
            var server = ConfigureServer();

            var client = server.CreateClient();

            var response = await client.GetAsync($"api/policy/{existingNumber}");
            response.EnsureSuccessStatusCode();

            var responseString = await response.Content.ReadAsStringAsync();
            responseString.ShouldNotBeNull();

            server.Dispose();
        }

        [Fact]
        public async Task Put_CreatePolicy_ReturnsSuccessResult()
        {
            var server = ConfigureServer();

            var client = server.CreateClient();

            var jsonString = "{\"policyNumber\":1,\"name\":1,\"age\":1,\"gender\":1}";
            var httpContent = new StringContent(jsonString, Encoding.UTF8, "application/json");
            var response = await client.PutAsync("api/policy", httpContent);
            response.EnsureSuccessStatusCode();

            var responseString = await response.Content.ReadAsStringAsync();
            responseString.ShouldNotBeNull();

            server.Dispose();
        }

        [Fact]
        public async Task Put_CreateExistingPolicy_ReturnsConflictResult()
        {
            var server = ConfigureServer();
            var client = server.CreateClient();

            var jsonString = $"{{\"policyNumber\":{existingNumber},\"name\":1,\"age\":1,\"gender\":1}}";
            var httpContent = new StringContent(jsonString, Encoding.UTF8, "application/json");
            var response = await client.PutAsync("api/policy", httpContent);
            response.StatusCode.ShouldBe(HttpStatusCode.Conflict);


            var responseString = await response.Content.ReadAsStringAsync();
            responseString.ShouldNotBeNull();

            server.Dispose();
        }

        [Fact]
        public async Task Put_CreateWrongPolicy_ReturnsConflictResult()
        {
            var server = ConfigureServer();
            var client = server.CreateClient();

            var jsonString = $"{{\"policyNumber\":\"\",\"name\":\"\",\"age\":150,\"gender\":2}}";
            var httpContent = new StringContent(jsonString, Encoding.UTF8, "application/json");
            var response = await client.PutAsync("api/policy", httpContent);
            response.StatusCode.ShouldBe(HttpStatusCode.BadRequest);


            var responseString = await response.Content.ReadAsStringAsync();
            responseString.ShouldNotBeNull();

            server.Dispose();
        }
        [Fact]
        public async Task Post_UpdatePolicy_ReturnsSuccessResult()
        {
            var server = ConfigureServer();

            var client = server.CreateClient();

            var jsonString = $"{{\"policyNumber\":{existingNumber},\"name\":1,\"age\":1,\"gender\":1}}";
            var httpContent = new StringContent(jsonString, Encoding.UTF8, "application/json");
            var response = await client.PostAsync("api/policy", httpContent);
            response.EnsureSuccessStatusCode();

            var responseString = await response.Content.ReadAsStringAsync();
            responseString.ShouldNotBeNull();

            server.Dispose();
        }

        [Fact]
        public async Task Post_UpdateNotExistingPolicy_ReturnsNotFoundResult()
        {
            var server = ConfigureServer();

            var client = server.CreateClient();

            var jsonString = $"{{\"policyNumber\":{notExistingNumber},\"name\":1,\"age\":1,\"gender\":1}}";
            var httpContent = new StringContent(jsonString, Encoding.UTF8, "application/json");
            var response = await client.PostAsync("api/policy", httpContent);
            response.StatusCode.ShouldBe(HttpStatusCode.NotFound);

            var responseString = await response.Content.ReadAsStringAsync();
            responseString.ShouldNotBeNull();

            server.Dispose();
        }

        [Fact]
        public async Task Delete_DeletePolicy_ReturnsSuccessResult()
        {
            var server = ConfigureServer();

            var client = server.CreateClient();

            var response = await client.DeleteAsync($"api/policy/{existingNumber}");
            response.EnsureSuccessStatusCode();

            var responseString = await response.Content.ReadAsStringAsync();
            responseString.ShouldNotBeNull();

            server.Dispose();
        }

        [Fact]
        public async Task Delete_DeleteNotExistingsPolicy_ReturnsNotFoundResult()
        {
            var server = ConfigureServer();

            var client = server.CreateClient();

            var response = await client.DeleteAsync($"api/policy/777");
            response.StatusCode.ShouldBe(HttpStatusCode.NotFound);
            
            server.Dispose();
        }
        private static TestServer ConfigureServer()
        {
            var server = new TestServer(new WebHostBuilder()
                .ConfigureAppConfiguration(x =>
                {
                })
                .UseStartup<Startup>());

            return server;
        }
    }
}
