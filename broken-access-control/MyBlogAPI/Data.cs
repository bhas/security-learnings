using System.Text.Json.Serialization;

namespace MyBlogAPI;

public static class Data
{
    public static List<User> Users { get; set; } = [
        new User("amanda.p", "password2", "Amanda Peterson", "4111 1111 1111 1111", [UserRole.Editor, UserRole.Reader]),
        new User("johnsmith", "password", "John Smith", "5555 5555 5555 4444", [UserRole.Editor, UserRole.Reader]),
        new User("bhv", "password", "Bjorn Vinther", null, [UserRole.Reader]),
        new User("bigboss", "admin", "Jannick Nielsen", "6011 1111 1111 1117", [UserRole.Admin]),
    ];

    public static List<Post> Posts { get; set; } = [
        new Post(1, "Welcome to the Blog", "This is our first post!", new DateTime(2024, 10, 1), "amanda.p"),
        new Post(2, "Writing with Style", "Let's talk about writing clean code.", new DateTime(2024, 10, 5), "johnsmith"),
        new Post(3, "Admin Announcements", "Important updates from the admin.", new DateTime(2024, 10, 10), "bigboss")
    ];

    public static List<Comment> Comments { get; set; } = [
        new Comment(1, 1, "Awesome first post!", new DateTime(2024, 10, 2), "bhv"),
        new Comment(2, 1, "Looking forward to more.", new DateTime(2024, 10, 3), "johnsmith"),
        new Comment(3, 2, "Clean code is everything.", new DateTime(2024, 10, 6), "amanda.p"),
        new Comment(4, 3, "Thanks for the update!", new DateTime(2024, 10, 11), "bhv"),
        new Comment(5, 3, "Good to know!", new DateTime(2024, 10, 12), "johnsmith")
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