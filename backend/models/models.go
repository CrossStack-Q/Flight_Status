package models

import (
	"database/sql"
	"log"

	"github.com/crossstack-q/Flight_Status/backend/types"
	"golang.org/x/crypto/bcrypt"
)

// func CreateUser(db *sql.DB, username, email, password string) error {
// 	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
// 	if err != nil {
// 		return err
// 	}

// 	_, err = db.Exec("INSERT INTO users (username, email, password, created_at, updated_at) VALUES ($1, $2, $3, NOW(), NOW())", username, email, hashedPassword)
// 	return err
// }

func CreateUser(db *sql.DB, username, email, password string) error {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}

	_, err = db.Exec("INSERT INTO users (username, email, password, created_at, updated_at) VALUES ($1, $2, $3, NOW(), NOW())", username, email, hashedPassword)
	if err != nil {
		log.Println("Error inserting user into the database:", err)
		return err
	}
	return nil
}

func GetUserByUsername(db *sql.DB, username string) (*types.User, error) {
	var user types.User
	err := db.QueryRow("SELECT id, username, email, password, created_at, updated_at FROM users WHERE username = $1", username).Scan(&user.ID, &user.Username, &user.Email, &user.Password, &user.CreatedAt, &user.UpdatedAt)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}
	return &user, nil
}
