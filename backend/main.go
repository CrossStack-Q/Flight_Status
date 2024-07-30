package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/crossstack-q/Flight_Status/backend/db"
	"github.com/crossstack-q/Flight_Status/backend/notification"
	"github.com/crossstack-q/Flight_Status/backend/routes"
	"github.com/lib/pq"
)

func listenForNotifications(db *sql.DB) {
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
				fmt.Println("Received notification:", notificationDbChanges.Extra)
				notification.WhatsappNotify("whatsapp:+919718043803")
			}
		case <-time.After(90 * time.Second):
			go func() {
				listener.Ping()
			}()
		}
	}
}
func main() {

	db := db.Connect()
	defer db.Close()

	go listenForNotifications(db)

	http.HandleFunc("/ws", routes.WsHandler(db))
	http.HandleFunc("/flight-status", routes.FlightStatusHandler(db))

	// notification.WhatsappNotify("whatsapp:+919718043803")

	fmt.Println("Backend is running on port 8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
