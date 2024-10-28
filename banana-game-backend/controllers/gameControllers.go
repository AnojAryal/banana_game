package controllers

import (
	"net/http"
	"time"

	"github.com/anojaryal/banana-game-backend/initializers"
	"github.com/anojaryal/banana-game-backend/models"
	"github.com/gin-gonic/gin"
)

func CreateGame(c *gin.Context) {
	// Parse the request body
	var body struct {
		LastPlayed       time.Time `json:"last_played"`
		TotalGamesPlayed int       `json:"total_games_played"`
		UserID           uint      `json:"user_id"`
	}

	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request format"})
		return
	}

	// Create the game record
	game := models.Game{
		LastPlayed:       body.LastPlayed,
		TotalGamesPlayed: body.TotalGamesPlayed,
		UserID:           body.UserID,
	}

	if err := initializers.DB.Create(&game).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create game record"})
		return
	}

	// Respond with the created game's data
	c.JSON(http.StatusCreated, gin.H{
		"game": gin.H{
			"id":                 game.ID,
			"last_played":        game.LastPlayed,
			"total_games_played": game.TotalGamesPlayed,
			"user_id":            game.UserID,
		},
	})
}

// get games
func GetGame(c *gin.Context) {
	// Get the game ID from the URL parameter
	id := c.Param("id")

	// Find the game by ID
	var game models.Game
	if err := initializers.DB.Preload("User").First(&game, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Game not found"})
		return
	}

	// Respond with game data
	c.JSON(http.StatusOK, gin.H{
		"game": gin.H{
			"id":                 game.ID,
			"last_played":        game.LastPlayed,
			"total_games_played": game.TotalGamesPlayed,
			"user_id":            game.UserID,
			"user": gin.H{
				"id":        game.User.ID,
				"full_name": game.User.FullName,
				"email":     game.User.Email,
				"username":  game.User.Username,
			},
		},
	})
}
