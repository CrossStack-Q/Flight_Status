package models

import (
	"database/sql"
	"errors"
	"fmt"
	"log"

	"github.com/crossstack-q/Flight_Status/backend/types"
	"github.com/lib/pq"
	"golang.org/x/crypto/bcrypt"
)

var ErrUserExists = errors.New("user already exists")

func CreateUser(db *sql.DB, username, email, password string) error {
	// Check if username or email already exists
	var userExists bool
	err := db.QueryRow("SELECT EXISTS(SELECT 1 FROM users WHERE username=$1 OR email=$2)", username, email).Scan(&userExists)
	if err != nil {
		return err
	}

	if userExists {
		return ErrUserExists
	}

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

func AddUserToFlight(db *sql.DB, flightnumber string, username string, email string, phone string) error {

	query := fmt.Sprintf("INSERT INTO %s (username, email, phone) VALUES ($1, $2, $3)", pq.QuoteIdentifier(flightnumber))
	_, err := db.Exec(query, username, email, phone)

	_, err1 := db.Exec("UPDATE users SET flight_number = $1 WHERE username = $2", flightnumber, username)

	// _, err := db.Exec("INSERT INTO $1 ( username, email, phone ) VALUES ($2 , $3 , $4 )", flightnumber, username, email, phone)
	if err != nil {
		log.Println("Error inserting user into the database zz04:", err)
		return err
	}
	if err1 != nil {
		log.Println("Error inserting user into the database zz05 users wala:", err)
		return err
	}
	return nil
}

func GetUserInfoByUsername(db *sql.DB, username string) (*types.UserInfo, error) {
	var user types.UserInfo
	err := db.QueryRow("SELECT id, username, email, password, flight_number, created_at, updated_at FROM users WHERE username = $1", username).Scan(
		&user.ID,
		&user.Username,
		&user.Email,
		&user.Password,
		&user.FlightNumber,
		&user.CreatedAt,
		&user.UpdatedAt,
	)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil // No user found
		}
		log.Println("Error retrieving user:", err)
		return nil, err
	}
	return &user, nil
}
