package types

import "time"

type Flight struct {
	FlightNumber        string `json:"flight_number"`
	Status              string `json:"status"`
	GateChange          bool   `json:"gate_change"`
	DelayMinutes        int    `json:"delay_minutes"`
	UpdatedAt           string `json:"updated_at"`
	DeportLocation      string `json:"deport_location"`
	DeportTime          string `json:"deport_time"`
	DeportDistance      string `json:"deport_distance"`
	DestinationLocation string `json:"destination_location"`
	DestinationTime     string `json:"destination_time"`
	DestinationDistance string `json:"destination_distance"`
}

type AuthInput struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type User struct {
	ID        uint      `json:"id"`
	Username  string    `json:"username"`
	Email     string    `json:"email"`
	Password  string    `json:"-"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
