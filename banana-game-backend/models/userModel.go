package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	FullName string `gorm:"type:varchar(100);not null"`
	Email    string `gorm:"type:varchar(100);unique;not null"`
	Username string `gorm:"type:varchar(50);unique;not null"`
	Password string `gorm:"type:varchar(255);not null"`
	Games    []Game
}
