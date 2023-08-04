using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace yourscope_api.Migrations
{
    /// <inheritdoc />
    public partial class ModifyingCoverLetterObjectForSoftDelete : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "CoverLetters",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "CoverLetters");
        }
    }
}
