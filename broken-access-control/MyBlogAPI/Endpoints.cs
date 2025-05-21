using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace MyBlogAPI;

public static class EndpointExtensions
{
    public static void UseLoginEndpoint(this WebApplication app, string signingKey)
    {
        app.MapPost("/api/login", (UserLoginDto login) =>
        {
            var user = Data.Users.SingleOrDefault(x => x.username == login.username && x.password == login.password);
            if (user == null)
                return Results.Unauthorized();

            var claims = user.roles.Select(role => new Claim(ClaimTypes.Role, role.ToString())).ToList();
            claims.Add(new Claim(ClaimTypes.Name, user.username));
            var creds = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(signingKey)), SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.UtcNow.AddDays(7),
                signingCredentials: creds);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return Results.Ok(new { token = jwt });
        })
        .WithTags("Auth")
        .WithOpenApi();
    }

    public static void UseUserEndpoint(this WebApplication app)
    {
        app.MapPost("/api/users", (CreateUserDto createUser) =>
        {
            var user = Data.Users.SingleOrDefault(x => x.username == createUser.username);
            if (user != null)
            {
                 return Results.BadRequest("username is already in use");
            }
            if (createUser.password?.Length < 8)
            {
                return Results.BadRequest("Your password must be at least 8 characters long");
            }

            var newUser = new User(createUser.username, createUser.password, createUser.fullName, createUser.creditCardNumber, [createUser.role]);
            Data.Users.Add(newUser);
            return Results.Created();
        })
        .WithTags("Users")
        .WithOpenApi();

        app.MapGet("/api/users/{username}", (string username) =>
        {
            var user = Data.Users.SingleOrDefault(x => x.username == username);
            if (user == null)
            {
                return Results.NotFound();
            }

            var dto = new UserDto(user.username, user.fullName, user.creditCardNumber, user.roles);
            return Results.Ok(dto);
        })
        .WithTags("Users")
        .WithOpenApi();
    }

    public static void UsePostEndpoints(this WebApplication app)
    {
        app.MapPost("/api/posts", (CreatePostDto createPost) =>
        {
            var nextId = Data.Posts.Max(x => x.id) + 1; 
            var newPost = new Post(nextId, createPost.title, createPost.content, DateTime.UtcNow, createPost.owner);
            Data.Posts.Add(newPost);
            return Results.Created();
        })
        .RequireAuthorization(x => x.RequireRole(
            UserRole.Editor.ToString(), 
            UserRole.Admin.ToString()))
        .WithTags("Posts")
        .WithOpenApi();

        app.MapGet("/api/posts", () =>
        {
            var posts = Data.Posts.Select(post => new PostDto(
                post.id,
                post.title,
                post.content,
                post.date,
                post.owner,
                Data.Comments
                    .Where(x => x.postId == post.id)
                    .Select(comment => new CommentDto(
                        comment.id,
                        comment.text,
                        comment.date,
                        comment.owner
                    ))
                    .ToList()
                ));
            return posts;
        })
        .RequireAuthorization(x => x.RequireRole(
            UserRole.Reader.ToString(), 
            UserRole.Editor.ToString(), 
            UserRole.Admin.ToString()))
        .WithTags("Posts")
        .WithOpenApi();

        app.MapGet("/api/posts/{postId}", (int postId) =>
        {
            var post = Data.Posts.Select(post => new PostDto(
                post.id,
                post.title,
                post.content,
                post.date,
                post.owner,
                Data.Comments
                    .Where(comment => comment.postId == post.id)
                    .Select(comment => new CommentDto(
                        comment.id,
                        comment.text,
                        comment.date,
                        comment.owner
                    ))
                    .ToList()
                ))
                .FirstOrDefault(post => post.id == postId);
            return post;
        })
        .RequireAuthorization(x => x.RequireRole(
            UserRole.Reader.ToString(),
            UserRole.Editor.ToString(),
            UserRole.Admin.ToString()))
        .WithTags("Posts")
        .WithOpenApi();
    }

    public static void UseCommentEndpoints(this WebApplication app)
    {
        app.MapPost("/api/posts/{postId}/comments", (int postId, CreateCommentDto createComment) =>
        {
            var post = Data.Posts.SingleOrDefault(post => post.id == postId);
            if (post == null)
            {
                return Results.NotFound();
            }

            var nextId = Data.Comments.Max(x => x.id) + 1;
            var newComment = new Comment(nextId, post.id, createComment.text, DateTime.UtcNow, createComment.owner);
            Data.Comments.Add(newComment);
            return Results.Created();
        })
        .RequireAuthorization(x => x.RequireRole(
            UserRole.Editor.ToString(),
            UserRole.Admin.ToString()))
        .WithTags("Comments")
        .WithOpenApi();

        app.MapDelete("/api/posts/{postId}/comments/{commentId}", (int postId, int commentId) =>
        {
            var post = Data.Posts.SingleOrDefault(x => x.id == postId);
            if (post == null)
            {
                return Results.NotFound();
            }

            var comment = Data.Comments.SingleOrDefault(x => x.id == commentId);
            if (comment == null)
            {
                return Results.NotFound();
            }

            Data.Comments.Remove(comment);
            return Results.NoContent();
        })
        .RequireAuthorization(x => x.RequireRole(
            UserRole.Editor.ToString(),
            UserRole.Admin.ToString()))
        .WithTags("Comments")
        .WithOpenApi();
    }
}

record CreateUserDto(string username, string password, string fullName, string? creditCardNumber, UserRole role);

record CreatePostDto(string title, string content, string owner);

record CreateCommentDto(string text, string owner);

record UserLoginDto(string username, string password);

record PostDto(int id, string title, string content, DateTime date, string owner, List<CommentDto> comments);

record CommentDto(int id, string text, DateTime date, string owner);

record UserDto(string username, string fullName, string? creditCardNumber, List<UserRole> roles);