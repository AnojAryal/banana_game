package main

import (
	"github.com/anojaryal/banana-game-backend/controllers"
	"github.com/anojaryal/banana-game-backend/initializers"
	"github.com/anojaryal/banana-game-backend/middleware"
	"github.com/gin-gonic/gin"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDB()
	initializers.SyncDatabase()

}

func main() {
	r := gin.Default()
	r.POST("/signup", controllers.SignUp)
	r.GET("/users", controllers.SignUp)
	r.POST("/login", controllers.Login)
	r.GET("/validate", middleware.RequireAuth, controllers.Validate)

	r.Run()
}
