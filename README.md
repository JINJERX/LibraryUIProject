1. Library Management System 

This is a simple educational full-stack project for managing a library system using ASP.NET Core Web API and React.

2.  Features

- Add, edit, and delete books
- Manage genres and authors
- Data stored in SQL Server
- Clean separation between backend and frontend
- Swagger UI for testing API endpoints

3. Tech Stack

3.1 Backend (ASP.NET Core):
- ASP.NET Core Web API
- Entity Framework Core
- AutoMapper
- SQL Server
- Swagger

3.2 Frontend (React):
- React with TypeScript
- Material UI
- React Router
- Fetch API

4 How to Run the Project

4.1 Backend
1. Open the solution in Visual Studio.
2. Configure `appsettings.json` with your SQL Server connection string.
3. Apply migrations and update the database:
   ```bash
   dotnet ef database update
   ```
4. Run the project:
   ```bash
   dotnet run
   ```
   The API should now be available at `http://localhost:5000`.

4.2 Frontend
1. Navigate to the `library-ui` folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
   The frontend should now be running at `http://localhost:3000`.
