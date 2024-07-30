package notification

import (
	"fmt"

	"github.com/twilio/twilio-go"
	twilioApi "github.com/twilio/twilio-go/rest/api/v2010"
)

func WhatsappNotify(to string) {
	accountSid := ""
	authToken := ""

	client := twilio.NewRestClientWithParams(twilio.ClientParams{
		Username: accountSid,
		Password: authToken,
	})

	params := &twilioApi.CreateMessageParams{}
	params.SetTo(to)
	params.SetFrom("whatsapp:+14155238886")
	params.SetBody("your Flight is updated")

	_, err := client.Api.CreateMessage(params)
	if err != nil {
		fmt.Println("Error sending SMS message: " + err.Error())
	} else {
		// response, _ := json.Marshal(*resp)
		// fmt.Println("Response: " + string(response))
		fmt.Println("Whatsapp Notification Sent")
	}
}
