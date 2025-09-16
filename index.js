import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm"

// 🔑 Your Supabase credentials
const SUPABASE_URL = "https://pjlbnwoaygmcbgnjaenp.supabase.co"
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqbGJud29heWdtY2JnbmphZW5wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMjE2NzUsImV4cCI6MjA3MzU5NzY3NX0.moPDO2PYYw5jExQOZGwawQtNFs3h0qB8EG6gTD-uTi4"

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Grab HTML elements
const button = document.getElementById("getFact")
const factDisplay = document.getElementById("fact")
const newFactInput = document.getElementById("newFact")
const addFactButton = document.getElementById("addFact")
const addMessage = document.getElementById("addMessage")

// Fetch one random fact from Supabase
async function fetchRandomFact() {
  const { data, error } = await supabase.from("facts").select("id, fact")

  if (error || !data || data.length === 0) {
    factDisplay.innerText = "❌ No facts found 😔"
    console.error("Error fetching random fact:", error)
    return
  }

  const randomFact = data[Math.floor(Math.random() * data.length)].fact
  factDisplay.innerText = randomFact
}

// Button click → Get a fact
button.addEventListener("click", fetchRandomFact)

// Add a new fact to Supabase
addFactButton.addEventListener("click", async () => {
  const newFact = newFactInput.value.trim()

  if (!newFact) {
    addMessage.innerText = "⚠️ Please enter a fact!"
    return
  }

  const { error } = await supabase
    .from("facts")
    .insert([{ fact: newFact }])

  if (error) {
    addMessage.innerText = "❌ Error adding fact"
    console.error(error)
  } else {
    addMessage.innerText = "✅ Fact added successfully!"
    newFactInput.value = ""
  }
})
