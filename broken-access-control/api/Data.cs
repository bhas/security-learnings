using System.Text.Json.Serialization;

namespace MyBlogAPI;

public static class Data
{
    public static List<User> Users { get; set; } = [
        new ("developer", "1234", "Internal Developer", null, new List<UserRole> { UserRole.Editor, UserRole.Reader }),
        new ("amanda.p", "password2", "Amanda Peterson", "4111 1111 1111 1111", new List<UserRole> { UserRole.Editor, UserRole.Reader }),
        new ("johnsmith", "password", "John Smith", "5555 5555 5555 4444", new List<UserRole> { UserRole.Editor, UserRole.Reader }),
        new ("bhv", "password", "Bjorn Vinther", null, new List<UserRole> { UserRole.Reader }),
        new ("bigboss", "admin", "Jannick Nielsen", "6011 1111 1111 1117", new List<UserRole> { UserRole.Admin }),
        new ("jsmith", "pass123", "Jane Smith", "1234 5678 9012 3456", new List<UserRole> { UserRole.Reader }),
        new ("mike_t", "mikepass", "Mike Thompson", "9876 5432 1098 7654", new List<UserRole> { UserRole.Editor }),
        new ("sarahm", "sarahpass", "Sarah Miller", "2468 1357 8024 6802", new List<UserRole> { UserRole.Reader }),
        new ("davidw", "davidpass", "David Wilson", "5555 1234 5678 9999", new List<UserRole> { UserRole.Editor }),
        new ("emilyr", "emilypass", "Emily Roberts", "7777 8888 9999 0000", new List<UserRole> { UserRole.Reader }),
        new ("alexj", "alexpass", "Alex Johnson", "1111 2222 3333 4444", new List<UserRole> { UserRole.Editor }),
        new ("laurab", "laurapass", "Laura Brown", "9999 8888 7777 6666", new List<UserRole> { UserRole.Reader }),
        new ("chrisg", "chrispass", "Chris Green", "1234 5678 9012 3456", new List<UserRole> { UserRole.Editor }),
        new ("monicac", "monicapass", "Monica Clark", "9876 5432 1098 7654", new List<UserRole> { UserRole.Reader }),
        new ("peterp", "peterpass", "Peter Parker", "2468 1357 8024 6802", new List<UserRole> { UserRole.Editor }),
        new ("lisal", "lisapass", "Lisa Lee", "5555 1234 5678 9999", new List<UserRole> { UserRole.Reader }),
        new ("tomh", "tompass", "Tom Hill", "7777 8888 9999 0000", new List<UserRole> { UserRole.Editor }),
        new ("oliviaw", "oliviapass", "Olivia White", "1111 2222 3333 4444", new List<UserRole> { UserRole.Reader }),
        new ("samuels", "sampass", "Samuel Scott", "9999 8888 7777 6666", new List<UserRole> { UserRole.Editor }),
        new ("nataliel", "nataliepass", "Natalie Lopez", "1234 5678 9012 3456", new List<UserRole> { UserRole.Reader }),
        new ("markr", "markpass", "Mark Robinson", "9876 5432 1098 7654", new List<UserRole> { UserRole.Editor }),
        new ("victoriaw", "victoriapass", "Victoria Ward", "2468 1357 8024 6802", new List<UserRole> { UserRole.Reader }),
        new ("danielc", "danielpass", "Daniel Cooper", "5555 1234 5678 9999", new List<UserRole> { UserRole.Editor }),
        new ("graceh", "gracepass", "Grace Hill", "7777 8888 9999 0000", new List<UserRole> { UserRole.Reader }),
        new ("williamm", "williampass", "William Moore", "1111 2222 3333 4444", new List<UserRole> { UserRole.Editor }),
        new ("rachelw", "rachelpass", "Rachel Ward", "9999 8888 7777 6666", new List<UserRole> { UserRole.Reader }),
        new ("kevinp", "kevinpass", "Kevin Peterson", "1234 5678 9012 3456", new List<UserRole> { UserRole.Editor }),
        new ("jessicam", "jessicapass", "Jessica Martinez", "9876 5432 1098 7654", new List<UserRole> { UserRole.Reader }),
        new ("brianh", "brianpass", "Brian Harris", "2468 1357 8024 6802", new List<UserRole> { UserRole.Editor }),
        new ("carolynr", "carolynpass", "Carolyn Reed", "5555 1234 5678 9999", new List<UserRole> { UserRole.Reader })
    ];

    public static List<Post> Posts { get; set; } = [
        new Post(1, "Welcome to the Blog", "This is our first post!", new DateTime(2024, 10, 1, 12, 17, 0), "amanda.p"),
        new Post(2, "Writing with Style", "Let's talk about writing clean code.", new DateTime(2024, 10, 5, 9, 40, 0), "markr"),
        new Post(3, "Admin Announcements", "Important updates from the admin.", new DateTime(2024, 10, 10, 10, 58, 0), "bigboss")
    ];

    public static List<Comment> Comments { get; set; } = [
        new Comment(1, 1, "Awesome first post!", new DateTime(2024, 10, 1, 14, 5, 0), "bhv"),
        new Comment(2, 1, "Looking forward to more.", new DateTime(2024, 10, 2, 17, 12, 0), "danielc"),
        new Comment(3, 2, "Clean code is everything.", new DateTime(2024, 10, 6, 10, 42, 0), "amanda.p"),
        new Comment(4, 3, "Thanks for the update!", new DateTime(2024, 10, 10, 11, 18, 0), "bhv"),
        new Comment(5, 3, "Good to know!", new DateTime(2024, 10, 10, 15, 22, 0), "carolynr"),
        new Comment(6, 3, "I hate you bigboss! In fact, I hate you all!", new DateTime(2024, 10, 11, 4, 4, 0), "emilyr")
    ];
}

public record Comment(int id, int postId, string text, DateTime date, string owner);

public record Post(int id, string title, string content, DateTime date, string owner);

public record User(string username, string password, string fullName, string? creditCardNumber, List<UserRole> roles);

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum UserRole
{
    Reader, Editor, Admin
}