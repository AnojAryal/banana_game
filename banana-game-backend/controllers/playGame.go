package controllers

import (
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

func getData(c *gin.Context) {
	url := "https://marcconrad.com/uob/banana/api.php?out=json"

	// Create an HTTP client with a timeout
	client := http.Client{
		Timeout: 10 * time.Second,
	}

	// Make GET request to the external API
	resp, err := client.Get(url)
	if err != nil {
		log.Println("Error fetching data:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch data"})
		return
	}
	defer resp.Body.Close()

	// Check the response status code
	if resp.StatusCode != http.StatusOK {
		c.JSON(resp.StatusCode, gin.H{"error": "Error fetching data"})
		return
	}

	// Decode JSON response into a map
	var result map[string]interface{}
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		log.Println("Error decoding response:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to decode response"})
		return
	}

	// Return the JSON response
	c.JSON(http.StatusOK, result)
}
