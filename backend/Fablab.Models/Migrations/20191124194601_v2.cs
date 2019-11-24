using Microsoft.EntityFrameworkCore.Migrations;

namespace Fablab.Models.Migrations
{
    public partial class v2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Aux_Group",
                table: "Members",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Aux_Group_Training",
                table: "Members",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Aux_Training",
                table: "Members",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Ecocience",
                table: "Members",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Number_Invoices",
                table: "Members",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Organization",
                table: "Members",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Organization_Address",
                table: "Members",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Aux_Group",
                table: "Members");

            migrationBuilder.DropColumn(
                name: "Aux_Group_Training",
                table: "Members");

            migrationBuilder.DropColumn(
                name: "Aux_Training",
                table: "Members");

            migrationBuilder.DropColumn(
                name: "Ecocience",
                table: "Members");

            migrationBuilder.DropColumn(
                name: "Number_Invoices",
                table: "Members");

            migrationBuilder.DropColumn(
                name: "Organization",
                table: "Members");

            migrationBuilder.DropColumn(
                name: "Organization_Address",
                table: "Members");
        }
    }
}
