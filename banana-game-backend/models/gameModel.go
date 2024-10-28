package models

import (
	"time"

	"gorm.io/gorm"
)

type Game struct {
	gorm.Model
	LastPlayed       time.Time `gorm:"type:timestamp"`
	TotalGamesPlayed int       `gorm:"default:0"`
	UserID           uint
	User             User `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
}
