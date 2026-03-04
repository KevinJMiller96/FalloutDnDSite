using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Common;
using System.Web;
using System.Web.Script.Serialization;
using Npgsql;

namespace FalloutSite
{
    public class QuestsHandler : IHttpHandler
    {
        public bool IsReusable => false;

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "application/json";

            try
            {
                var quests = LoadQuests();
                var serializer = new JavaScriptSerializer();
                context.Response.Write(serializer.Serialize(new { quests }));
            }
            catch (Exception ex)
            {
                context.Response.StatusCode = 500;
                var serializer = new JavaScriptSerializer();
                context.Response.Write(serializer.Serialize(new { error = "Unable to load quests.", details = ex.Message }));
            }
        }


    private static List<QuestDto> LoadQuests()
    {
        var connectionSettings = ConfigurationManager.ConnectionStrings["DefaultConnection"];
        if (connectionSettings == null)
            throw new InvalidOperationException("DefaultConnection missing.");

        var quests = new List<QuestDto>();

        using (var connection = new NpgsqlConnection(connectionSettings.ConnectionString))
        {
            connection.Open();

            using (var command = new NpgsqlCommand(
                "SELECT \"Quest_Name\", \"Quest_Description\" FROM \"Quests\"",
                connection))
            {
                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        quests.Add(new QuestDto
                        {
                            QuestName = reader["Quest_Name"]?.ToString() ?? "",
                            QuestDescription = reader["Quest_Description"]?.ToString() ?? ""
                        });
                    }
                }
            }
        }

        return quests;
    }

    private class QuestDto
        {
            public string QuestName { get; set; }
            public string QuestDescription { get; set; }
        }
    }
}
