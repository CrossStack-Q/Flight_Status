package routes

import (
	"database/sql"
	"encoding/json"
	"net/http"

	"github.com/crossstack-q/Flight_Status/backend/models"
	"github.com/crossstack-q/Flight_Status/backend/utils"
)

func GetUserInfoHandler(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		utils.EnableCors(w, r)
		if r.Method != http.MethodGet {
			http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
			return
		}

		username := r.URL.Query().Get("username")
		if username == "" {
			http.Error(w, "Username is required", http.StatusBadRequest)
			return
		}

		user, err := models.GetUserInfoByUsername(db, username)
		if err != nil {
			http.Error(w, "Failed to retrieve user", http.StatusInternalServerError)
			return
		}

		if user == nil {
			http.Error(w, "User not found", http.StatusNotFound)
			return
		}

		response := map[string]interface{}{
			"id":        user.ID,
			"username":  user.Username,
			"flightno":  user.FlightNumber,
			"email":     user.Email,
			"createdAt": user.CreatedAt,
			"updatedAt": user.UpdatedAt,
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(response)
	}
}
