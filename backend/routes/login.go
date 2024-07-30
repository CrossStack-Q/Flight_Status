package routes

import (
	"database/sql"
	"encoding/json"
	"net/http"

	"github.com/crossstack-q/Flight_Status/backend/models"
	"github.com/crossstack-q/Flight_Status/backend/types"
	"github.com/crossstack-q/Flight_Status/backend/utils"
	"golang.org/x/crypto/bcrypt"
)

func LoginHandler(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		utils.EnableCors(w, r)
		if r.Method != http.MethodPost {
			http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
			return
		}

		var input types.AuthInput
		if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
			http.Error(w, "Invalid request body", http.StatusBadRequest)
			return
		}

		user, err := models.GetUserByUsername(db, input.Username)
		if err != nil || user == nil {
			http.Error(w, "Invalid username or password", http.StatusUnauthorized)
			return
		}

		if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(input.Password)); err != nil {
			http.Error(w, "Invalid username or password", http.StatusUnauthorized)
			return
		}

		// Create response structure
		response := map[string]interface{}{
			"id":       user.ID,
			"username": user.Username,
			"email":    user.Email,
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(response)
		w.WriteHeader(http.StatusOK)
	}
}
