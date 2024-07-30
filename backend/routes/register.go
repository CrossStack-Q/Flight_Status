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
			http.Error(w, "Failed to register user", http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusCreated)
	}
}
