package main

import (
	"github.com/anojaryal/banana-game-backend/controllers"
	"github.com/anojaryal/banana-game-backend/initializers"
	"github.com/anojaryal/banana-game-backend/middleware"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDB()
	initializers.SyncDatabase()
}

func main() {
	r := gin.Default()

	corsConfig := cors.Config{
		AllowOrigins: []string{"http://localhost:5173"},
		AllowMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders: []string{"Origin", "Content-Type", "Authorization"},
	}

	r.Use(cors.New(corsConfig))

	r.POST("/signup", controllers.SignUp)
	r.GET("/users", controllers.GetUser)

	r.POST("/game", middleware.RequireAuth, controllers.CreateGame)
	r.GET("/game/:id", middleware.RequireAuth, controllers.GetGame)

	r.POST("/login", controllers.Login)
	r.GET("/validate", middleware.RequireAuth, controllers.Validate)

	r.GET("/banana_api", controllers.GetData)

	r.Run()
}
