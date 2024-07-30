package routes

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/crossstack-q/Flight_Status/backend/models"
	"github.com/crossstack-q/Flight_Status/backend/types"
	"github.com/crossstack-q/Flight_Status/backend/utils"
)

func RegisterHandler(db *sql.DB) http.HandlerFunc {
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

		fmt.Println("Proceed")

		if err := models.CreateUser(db, input.Username, input.Email, input.Password); err != nil {
			if err == models.ErrUserExists {
				http.Error(w, "User already exists", http.StatusConflict)
				return
			}
			http.Error(w, "Failed to register user", http.StatusInternalServerError)
			return
		}

		user, err := models.GetUserByUsername(db, input.Username)
		if err != nil || user == nil {
			http.Error(w, "Invalid username", http.StatusUnauthorized)
			return
		}

		response := map[string]interface{}{
			"id":       user.ID,
			"username": user.Username,
			"email":    user.Email,
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(response)

		w.WriteHeader(http.StatusCreated)
	}
}
