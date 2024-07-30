package db

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/lib/pq"
)

func Connect() *sql.DB {
	connStr := "host=127.0.0.1 user=postgres password=dsa port=5432 dbname=flight_status sslmode=disable"
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal(err)
	}

	err = db.Ping()
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Database connection established")
	return db

}
