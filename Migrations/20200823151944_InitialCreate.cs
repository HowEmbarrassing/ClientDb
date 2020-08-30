using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ClientDbWebApp.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Clients",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ClientName = table.Column<string>(nullable: true),
                    ClientInn = table.Column<string>(nullable: true),
                    ClientType = table.Column<string>(nullable: true),
                    ClientCreatedDate = table.Column<DateTime>(nullable: false),
                    ClientUpdatedDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Clients", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Founders",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FounderFullName = table.Column<string>(nullable: true),
                    FounderInn = table.Column<string>(nullable: true),
                    FounderCreatedDate = table.Column<DateTime>(nullable: false),
                    FounderUpdatedDate = table.Column<DateTime>(nullable: false),
                    ClientID = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Founders", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Founders_Clients_ClientID",
                        column: x => x.ClientID,
                        principalTable: "Clients",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Founders_ClientID",
                table: "Founders",
                column: "ClientID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Founders");

            migrationBuilder.DropTable(
                name: "Clients");
        }
    }
}
