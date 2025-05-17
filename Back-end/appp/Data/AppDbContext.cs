using Microsoft.EntityFrameworkCore;
using Models;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Student> Students { get; set; }
    public DbSet<CallSummary> CallSumary { get; set; }
    public DbSet<Dialer> Dialers { get; set; }
    public DbSet<Agent> Agents { get; set; }
}