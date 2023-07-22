using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace yourscope_api.Migrations
{
    /// <inheritdoc />
    public partial class UpdateJobApplication : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ResumeId",
                table: "CoverLetters",
                newName: "CoverLetterId");

            migrationBuilder.AddColumn<int>(
                name: "CoverLetterId",
                table: "JobApplications",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_JobApplications_CoverLetterId",
                table: "JobApplications",
                column: "CoverLetterId");

            migrationBuilder.AddForeignKey(
                name: "FK_JobApplications_CoverLetters_CoverLetterId",
                table: "JobApplications",
                column: "CoverLetterId",
                principalTable: "CoverLetters",
                principalColumn: "CoverLetterId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_JobApplications_CoverLetters_CoverLetterId",
                table: "JobApplications");

            migrationBuilder.DropIndex(
                name: "IX_JobApplications_CoverLetterId",
                table: "JobApplications");

            migrationBuilder.DropColumn(
                name: "CoverLetterId",
                table: "JobApplications");

            migrationBuilder.RenameColumn(
                name: "CoverLetterId",
                table: "CoverLetters",
                newName: "ResumeId");
        }
    }
}
