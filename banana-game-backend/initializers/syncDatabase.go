package initializers

import "github.com/anojaryal/banana-game-backend/models"

func SyncDatabase() {
	DB.AutoMigrate(&models.User{})
}
