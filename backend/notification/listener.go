package notification

import (
	"database/sql"
	"fmt"
	"log"
	"strings"
	"time"

	"github.com/lib/pq"
	_ "github.com/lib/pq"
)

func ListenForNotifications(db *sql.DB) {
	reportProblem := func(ev pq.ListenerEventType, err error) {
		if err != nil {
			fmt.Printf("Listener error: %v\n", err)
		}
	}

	connStr := "user=postgres password=dsa dbname=flight_status sslmode=disable"
	listener := pq.NewListener(connStr, 10*time.Second, time.Minute, reportProblem)
	err := listener.Listen("flight_changes")
	if err != nil {
		log.Fatal(err)
	}

	for {
		select {
		case notificationDbChanges := <-listener.Notify:
			if notificationDbChanges != nil {
				// Assuming the message format is something like "Flight zz04 is updated"
				message := notificationDbChanges.Extra
				fmt.Println("Received notification:", message)

				// Extract flight code from the message
				parts := strings.Fields(message)
				if len(parts) > 1 && parts[0] == "Flight" {
					changedFlight := parts[1] // This will store "zz04"
					fmt.Println("Changed Flight:", changedFlight)

					// Query the database for phone numbers
					phones, err := getPhoneNumbers(db, changedFlight)
					if err != nil {
						fmt.Printf("Error retrieving phone numbers: %v\n", err)
						continue
					}

					// Notify each phone number
					for _, phone := range phones {
						fmt.Println(phone)
						WhatsappNotify("whatsapp:+91" + phone)
					}
				} else {
					fmt.Println("Unexpected message format")
				}
			}
		case <-time.After(90 * time.Second):
			go func() {
				listener.Ping()
			}()
		}
	}
}

func getPhoneNumbers(db *sql.DB, flightCode string) ([]string, error) {
	query := fmt.Sprintf("SELECT phone FROM %s", flightCode)
	rows, err := db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var phones []string
	for rows.Next() {
		var phone string
		if err := rows.Scan(&phone); err != nil {
			return nil, err
		}
		phones = append(phones, phone)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return phones, nil
}
