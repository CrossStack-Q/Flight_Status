package routes

import (
	"database/sql"
	"log"
	"net/http"

	"github.com/crossstack-q/Flight_Status/backend/types"
	"github.com/crossstack-q/Flight_Status/backend/utils"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func WsHandler(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		utils.EnableCors(&w)
		conn, err := upgrader.Upgrade(w, r, nil)
		if err != nil {
			log.Println(err)
			return
		}
		defer conn.Close()

		for {
			rows, err := db.Query("SELECT flight_number, status, gate_change, delay_minutes, TO_CHAR(updated_at, 'DD Mon YYYY HH:MI AM') AS updated_at , deport_location , TO_CHAR(deport_time, 'HH:MI AM') AS deport_time , deport_distance , destination_location , TO_CHAR(destination_time, 'HH:MI AM') AS destination_time , destination_distance FROM flights")
			if err != nil {
				log.Println(err)
				return
			}

			var flights []types.Flight
			for rows.Next() {
				var flight types.Flight
				if err := rows.Scan(&flight.FlightNumber, &flight.Status, &flight.GateChange, &flight.DelayMinutes, &flight.UpdatedAt, &flight.DeportLocation, &flight.DeportTime, &flight.DeportDistance, &flight.DestinationLocation, &flight.DestinationTime, &flight.DestinationDistance); err != nil {
					log.Println(err)
					return
				}
				flights = append(flights, flight)
			}

			err = conn.WriteJSON(flights)
			if err != nil {
				log.Println(err)
				return
			}
		}
	}
}
