package controllers

import (
	"net/http"

	"github.com/anojaryal/banana-game-backend/initializers"
	"github.com/anojaryal/banana-game-backend/models"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func SignUp(c *gin.Context) {
	// Get the details from the request body
	var body struct {
		FullName string `json:"full_name"`
		Email    string `json:"email"`
		Username string `json:"username"`
		Password string `json:"password"`
	}

	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request format"})
		return
	}

	// Hash the password
	hash, err := bcrypt.GenerateFromPassword([]byte(body.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
		return
	}

	// Create the user
	user := models.User{
		FullName: body.FullName,
		Email:    body.Email,
		Username: body.Username,
		Password: string(hash),
	}
	result := initializers.DB.Create(&user)

	// Handle errors during creation
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to create user, email or username might already be taken"})
		return
	}

	// Respond with the created user's data
	c.JSON(http.StatusCreated, gin.H{
		"user": gin.H{
			"id":       user.ID,
			"fullName": user.FullName,
			"email":    user.Email,
			"username": user.Username,
		},
	})
}

// get users
func GetUser(c *gin.Context) {
	// Get the user ID from the URL parameter
	id := c.Param("id")

	// Find the user by ID
	var user models.User
	if err := initializers.DB.First(&user, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	// Respond with user data
	c.JSON(http.StatusOK, gin.H{
		"user": gin.H{
			"id":       user.ID,
			"fullName": user.FullName,
			"email":    user.Email,
			"username": user.Username,
		},
	})
}
