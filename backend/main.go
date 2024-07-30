package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/crossstack-q/Flight_Status/backend/db"
	"github.com/crossstack-q/Flight_Status/backend/notification"
	"github.com/crossstack-q/Flight_Status/backend/routes"
)

// func listenForNotifications(db *sql.DB) {

// 	reportProblem := func(ev pq.ListenerEventType, err error) {
// 		if err != nil {
// 			fmt.Printf("Listener error: %v\n", err)
// 		}
// 	}

// 	connStr := "user=postgres password=dsa dbname=flight_status sslmode=disable"
// 	listener := pq.NewListener(connStr, 10*time.Second, time.Minute, reportProblem)
// 	err := listener.Listen("flight_changes")
// 	if err != nil {
// 		log.Fatal(err)
// 	}

// 	for {
// 		select {
// 		case notificationDbChanges := <-listener.Notify:
// 			if notificationDbChanges != nil {
// 				fmt.Println("Received notification:", notificationDbChanges.Extra)
// 				notification.WhatsappNotify("whatsapp:+919718043803")
// 			}
// 		case <-time.After(90 * time.Second):
// 			go func() {
// 				listener.Ping()
// 			}()
// 		}
// 	}
// }

func main() {

	db := db.Connect()
	defer db.Close()

	go notification.ListenForNotifications(db)

	http.HandleFunc("/ws", routes.WsHandler(db))
	http.HandleFunc("/flight-status", routes.FlightStatusHandler(db))

	http.HandleFunc("/auth/signup", routes.RegisterHandler(db))
	http.HandleFunc("/auth/login", routes.LoginHandler(db))
	http.HandleFunc("/auth/user-flight", routes.UserFlight(db))
	http.HandleFunc("/user-info", routes.GetUserInfoHandler(db))

	// notification.WhatsappNotify("whatsapp:+919718043803")

	fmt.Println("Backend is running on port 8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
