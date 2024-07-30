package routes

import (
	"database/sql"
	"encoding/json"

	"fmt"
	"log"
	"net/http"

	"github.com/crossstack-q/Flight_Status/backend/types"
	"github.com/crossstack-q/Flight_Status/backend/utils"
	_ "github.com/lib/pq"
)

func FlightStatusHandler(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		utils.EnableCors(&w)
		if r.Method == http.MethodOptions {
			return
		}

		flightNumber := r.URL.Query().Get("flight_number")
		date := r.URL.Query().Get("date")

		if flightNumber == "" || date == "" {
			http.Error(w, "Missing flight_number or date", http.StatusBadRequest)
			return
		}

		var dateCondition string
		switch date {
		case "yesterday":
			dateCondition = "updated_at >= now() - interval '1 day' and updated_at < now()"
		case "today":
			dateCondition = "date(updated_at) = current_date"
		case "tomorrow":
			dateCondition = "updated_at >= now() + interval '1 day' and updated_at < now() + interval '2 days'"
		default:
			http.Error(w, "Invalid date value", http.StatusBadRequest)
			return
		}

		query := fmt.Sprintf(`
		SELECT flight_number, status, gate_change, delay_minutes, TO_CHAR(updated_at, 'DD Mon YYYY HH:MI AM') AS updated_at,
			deport_location, TO_CHAR(deport_time, 'HH:MI AM') AS deport_time, deport_distance, 
			destination_location, TO_CHAR(destination_time, 'HH:MI AM') AS destination_time, destination_distance 
		FROM flights 
		WHERE flight_number = $1 AND %s
	`, dateCondition)

		row := db.QueryRow(query, flightNumber)

		var flight types.Flight
		err := row.Scan(&flight.FlightNumber, &flight.Status, &flight.GateChange, &flight.DelayMinutes, &flight.UpdatedAt,
			&flight.DeportLocation, &flight.DeportTime, &flight.DeportDistance, &flight.DestinationLocation, &flight.DestinationTime, &flight.DestinationDistance)
		if err != nil {
			if err == sql.ErrNoRows {
				http.Error(w, "Flight not found", http.StatusNotFound)
				return
			}
			log.Println(err)
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(flight)
	}

}
