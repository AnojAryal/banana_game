# Banana Game Backend

## Overview

This project is a backend API for a Banana Game application, built using [Golang](https://go.dev/learn/) with the [Gin](https://gin-gonic.com/) framework.

## Installation

1. **Clone the repository:**

    ```sh
    git clone git@github.com:AnojAryal/banana_game.git
    ```
    or
    ```sh
    git clone https://github.com/AnojAryal/banana_game.git
    ```

2. **Navigate to the project directory:**

    ```sh
    cd banana-game-backend
    ```

3. **Install the dependencies:**

    ```sh
    go mod download
    ```

4. **Set up environment variables:**

    Create a `.env` file in the project root with the following content:

    ```env
    PORT = 3000
    DB_URL = "host=localhost user= password= dbname= port=5432 sslmode=disable"
    SECRET_KEY = "NWFjODUwZTI3ODc4MDI3MzBhMGJjM2FhNjM5NzJlNzQ"
    ```

5. **Run the application:**

    ```sh
    go run main.go
    ```
    or
     ```sh
    CompileDaemon -command="./banana-game-backend"
    ```

## Contact

For any questions or suggestions, feel free to reach out to [anoj1810@gmail.com](mailto:anoj1810@gmail.com).