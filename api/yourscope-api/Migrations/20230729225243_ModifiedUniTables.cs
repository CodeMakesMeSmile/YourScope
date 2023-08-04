using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace yourscope_api.Migrations
{
    /// <inheritdoc />
    public partial class ModifiedUniTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Degree",
                table: "UniPrograms");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "UniPrograms",
                newName: "Language");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Language",
                table: "UniPrograms",
                newName: "Description");

            migrationBuilder.AddColumn<string>(
                name: "Degree",
                table: "UniPrograms",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");
        }
    }
}
